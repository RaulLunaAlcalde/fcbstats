import json
import os
from flask import Flask, jsonify
from flask_cors import CORS
from scraper import get_barcelona_players
from flask import send_file
import traceback
import unicodedata
import requests
from datetime import datetime
from datetime import datetime, timedelta

app = Flask(__name__)
CORS(app)  


@app.route('/api/jugadores')
def jugadores():
    try:
        df = get_barcelona_players()
        return jsonify(df.to_dict(orient='records'))
    except Exception as e:
        return jsonify({'error': traceback.format_exc()}), 500


@app.route('/api/disparos')
def disparos():
    with open("statsbomb/events/3775631.json", "r", encoding="utf-8") as f:
        events = json.load(f)

    shots = [
        {
            "x": e["location"][0],
            "y": e["location"][1],
            "outcome": e["shot"]["outcome"]["name"],
        }
        for e in events
        if e["type"]["name"] == "Shot" and e["team"]["name"] == "Barcelona"
    ]
    return jsonify(shots)




def normalize_name(name):
    name = name.lower().replace(" ", "_")
    name = unicodedata.normalize('NFKD', name).encode('ASCII', 'ignore').decode('utf-8')
    return name

@app.route('/api/heatmap')
def heatmap():
    from flask import request
    player = request.args.get('player', '')
    normalized_name = normalize_name(player)

    try:
        with open(f"heatmaps/{normalized_name}.json", "r", encoding="utf-8") as f:
            heatmap_data = json.load(f)

        return jsonify({
            "coordinates": heatmap_data
        })
    except FileNotFoundError:
        return jsonify({"error": f"No heatmap found for player: {normalized_name}"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    


SPORTMONKS_API_KEY = 'Yqmk7i7IywCmye3le4TRaiCXQ6UQN3uCKqA02FQf8aLViwKaCFXtQSU2xWeA'
BARCELONA_TEAM_ID = 83  

@app.route('/api/calendario')
def calendario():
    try:
        ruta_json = os.path.join(os.path.dirname(__file__), 'calendario_partidos.json')
        with open(ruta_json, "r", encoding="utf-8") as f:
            data = json.load(f)

        eventos = []

        def extraer_eventos(fixtures, liga):
            for partido in fixtures:
                fecha_completa = partido.get("starting_at", None)
                if not fecha_completa or "TBD" in fecha_completa:
                    fecha = "TBD"
                    hora = "Por confirmar"
                else:
                    fecha = fecha_completa.split(" ")[0]
                    hora = fecha_completa.split(" ")[1]

                participantes = partido["participants"]
                local = next((p for p in participantes if p["meta"]["location"] == "home"), {})
                visitante = next((p for p in participantes if p["meta"]["location"] == "away"), {})

                scores = partido.get("scores", [])
                local_score = next((s for s in scores if s["description"] == "CURRENT" and s["score"]["participant"] == "home"), {}).get("score", {}).get("goals")
                visitante_score = next((s for s in scores if s["description"] == "CURRENT" and s["score"]["participant"] == "away"), {}).get("score", {}).get("goals")

                resultado = f"{local_score} - {visitante_score}" if local_score is not None and visitante_score is not None else None

                eventos.append({
                    "fecha": fecha,
                    "hora": hora,
                    "local": local.get("name", "Desconocido"),
                    "visitante": visitante.get("name", "Desconocido"),
                    "localImage": local.get("image_path", ""),
                    "visitanteImage": visitante.get("image_path", ""),
                    "liga": liga,
                    "resultado": resultado
                })

        for fase in data["data"]:
            
            extraer_eventos(fase.get("fixtures", []), fase.get("name", "Desconocido"))

            
            for ronda in fase.get("rounds", []):
                extraer_eventos(ronda.get("fixtures", []), fase.get("name", "Desconocido"))

            
            for agregado in fase.get("aggregates", []):
                extraer_eventos(agregado.get("fixtures", []), fase.get("name", "Desconocido"))

        return jsonify(eventos)

    except Exception as e:
        return jsonify({"error": str(e)}), 500



def get_barcelona_fixtures():
    url = f'https://api.sportmonks.com/v3/football/fixtures'
    params = {
        'api_token': SPORTMONKS_API_KEY,
        'team_ids[]': BARCELONA_TEAM_ID,
        'include': 'league',
        'sort': 'starting_at',
        'per_page': 50,
    }
    response = requests.get(url, params=params)
    response.raise_for_status()
    data = response.json()

    fixtures = []
    for fixture in data.get('data', []):
        fixtures.append({
            'date': fixture['starting_at'],
            'opponent': fixture['participants'][1]['name'] if fixture['participants'][0]['id'] == BARCELONA_TEAM_ID else fixture['participants'][0]['name'],
            'home': fixture['participants'][0]['id'] == BARCELONA_TEAM_ID,
            'league': fixture['league']['name'],
        })
    return fixtures




if __name__ == '__main__':
    app.run(debug=True)
