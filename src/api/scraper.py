import pandas as pd

def get_barcelona_players():
    data = [
        {
            "id": 88625,
            "player_name": "Marc-André ter Stegen",
            "games_played": 7,
            "minutes_played": 585,
            "goals": 0,
            "assists": 0,
            "photo": "https://img.sofascore.com/api/v1/player/88625/image",
            "number": 1,
            "heatmap": "/terstegen.png"
        },
        {
            "id": 794949,
            "player_name": "Iñaki Peña",
            "games_played": 22,
            "minutes_played": 1876,
            "goals": 0,
            "assists": 0,
            "photo": "https://img.sofascore.com/api/v1/player/794949/image",
            "number": 13,
            "heatmap": "/inaki.png"
        },
        {
            "id": 50490,
            "player_name": "Wojciech Szczęsny",
            "games_played": 24,
            "minutes_played": 2126,
            "goals": 0,
            "assists": 0,
            "photo": "https://img.sofascore.com/api/v1/player/50490/image",
            "number": 25,
            "heatmap": "/fumeta.png"
        },
        {
            "id": 1402913,
            "player_name": "Pau Cubarsí",
            "games_played": 49,
            "minutes_played": 3628,
            "goals": 1,
            "assists": 4,
            "photo": "https://img.sofascore.com/api/v1/player/1402913/image",
            "number": 2,
            "heatmap": "/cubarsi.png"
        },
        {
            "id": 1031567,
            "player_name": "Pau Victor",
            "games_played": 23,
            "minutes_played": 296,
            "goals": 2,
            "assists": 1,
            "photo": "https://img.sofascore.com/api/v1/player/1031567/image",
            "number": 18,
            "heatmap": "/pauvictor.png"
        },   
        {
            "id": 997035,
            "player_name": "Alejandro Balde",
            "games_played": 43,
            "minutes_played": 3290,
            "goals": 1,
            "assists": 8,
            "photo": "https://img.sofascore.com/api/v1/player/997035/image",
            "number": 3,
            "heatmap": "/balde.png"
        },
        {
            "id": 925097,
            "player_name": "Ronald Araújo",
            "games_played": 18,
            "minutes_played": 1150,
            "goals": 2,
            "assists": 2,
            "photo": "https://img.sofascore.com/api/v1/player/925097/image",
            "number": 4,
            "heatmap": "/araujo.png"
        },
        {
            "id": 173883,
            "player_name": "Iñigo Martínez",
            "games_played": 40,
            "minutes_played": 3420,
            "goals": 3,
            "assists": 5,
            "photo": "https://img.sofascore.com/api/v1/player/173883/image",
            "number": 5,
            "heatmap": "/inigo.png"
        },
        {
            "id": 186795,
            "player_name": "Andreas Christensen",
            "games_played": 1,
            "minutes_played": 26,
            "goals": 0,
            "assists": 0,
            "photo": "https://img.sofascore.com/api/v1/player/186795/image",
            "number": 15,
            "heatmap": "/christensen.png"
        },
        {
            "id": 827212,
            "player_name": "Jules Koundé",
            "games_played": 51,
            "minutes_played": 4261,
            "goals": 3,
            "assists": 8,
            "photo": "https://img.sofascore.com/api/v1/player/827212/image",
            "number": 23,
            "heatmap": "/kounde.png"
        },
        {
            "id": 876214,
            "player_name": "Eric García",
            "games_played": 36,
            "minutes_played": 1534,
            "goals": 3,
            "assists": 1,
            "photo": "https://img.sofascore.com/api/v1/player/876214/image",
            "number": 24,
            "heatmap": "/eric.png"
        },
        {
            "id": 1082981,
            "player_name": "Pablo Torre",
            "games_played": 14,
            "minutes_played": 435,
            "goals": 4,
            "assists": 3,
            "photo": "https://img.sofascore.com/api/v1/player/1082981/image",
            "number": 14,
            "heatmap": "/pablo.png"
        },
        {
            "id": 1094827,
            "player_name": "Gerard Martín",
            "games_played": 33,
            "minutes_played": 1314,
            "goals": 1,
            "assists": 3,
            "photo": "https://img.sofascore.com/api/v1/player/1094827/image",
            "number": 35,
            "heatmap": "/gerard.png"
        },
        {
            "id": 1153335,
            "player_name": "Sergi Domínguez",
            "games_played": 6,
            "minutes_played": 234,
            "goals": 0,
            "assists": 0,
            "photo": "https://img.sofascore.com/api/v1/player/1153335/image",
            "number": 36,
            "heatmap": "/sergi.png"
        },
        {
            "id": 1103693,
            "player_name": "Gavi",
            "games_played": 33,
            "minutes_played": 1287,
            "goals": 3,
            "assists": 2,
            "photo": "https://img.sofascore.com/api/v1/player/1103693/image",
            "number": 8,
            "heatmap": "/gavi.png"
        },
        {
            "id": 992587,
            "player_name": "Pedri",
            "games_played": 50,
            "minutes_played": 3916,
            "goals": 5,
            "assists": 7,
            "photo": "https://img.sofascore.com/api/v1/player/992587/image",
            "number": 8,
            "heatmap": "/pedri.png"
        },
        {
            "id": 855833,
            "player_name": "Ferran Torres",
            "games_played": 40,
            "minutes_played": 1469,
            "goals": 17,
            "assists": 4,
            "photo": "https://img.sofascore.com/api/v1/player/855833/image",
            "number": 7,
            "heatmap": "/ferran.png"
        },
        {
            "id": 962883,
            "player_name": "Ansu Fati",
            "games_played": 9,
            "minutes_played": 208,
            "goals": 17,
            "assists": 4,
            "photo": "https://img.sofascore.com/api/v1/player/962883/image",
            "number": 10,
            "heatmap": "/ansu.png"
        },
        {
            "id": 1402908,
            "player_name": "Héctor Fort",
            "games_played": 15,
            "minutes_played": 497,
            "goals": 0,
            "assists": 0,
            "photo": "https://img.sofascore.com/api/v1/player/1402908/image",
            "number": 32,
            "heatmap": "/hector.png"
        },
        {
            "id": 795222,
            "player_name": "Frenkie de Jong",
            "games_played": 73,
            "minutes_played": 1920,
            "goals": 2,
            "assists": 2,
            "photo": "https://img.sofascore.com/api/v1/player/795222/image",
            "number": 21,
            "heatmap": "/frenkie.png"
        },
        {
            "id": 1153270,
            "player_name": "Fermín López",
            "games_played": 37,
            "minutes_played": 1604,
            "goals": 5,
            "assists": 8,
            "photo": "https://img.sofascore.com/api/v1/player/1153270/image",
            "number": 16,
            "heatmap": "/fermin.png"
        },
        {
            "id": 789071,
            "player_name": "Dani Olmo",
            "games_played": 28,
            "minutes_played": 2520,
            "goals": 8,
            "assists": 5,
            "photo": "https://img.sofascore.com/api/v1/player/789071/image",
            "number": 20,
            "heatmap": "/olmo.png"
        },
        {
            "id": 1526618,
            "player_name": "Marc Bernal",
            "games_played": 3,
            "minutes_played": 243,
            "goals": 0,
            "assists": 0,
            "photo": "https://img.sofascore.com/api/v1/player/1526618/image",
            "number": 28,
            "heatmap": "/bernal.png"
        },
        {
            "id": 1000483,
            "player_name": "Marc Casadó",
            "games_played": 36,
            "minutes_played": 2454,
            "goals": 1,
            "assists": 6,
            "photo": "https://img.sofascore.com/api/v1/player/1000483/image",
            "number": 17,
            "heatmap": "/casado.png"
        },
        {
            "id": 41789,
            "player_name": "Robert Lewandowski",
            "games_played": 48,
            "minutes_played": 3669,
            "goals":40,
            "assists": 3,
            "photo": "https://img.sofascore.com/api/v1/player/41789/image",
            "number": 9,
            "heatmap": "/lewandowski.png"
        },
        {
            "id": 1402912,
            "player_name": "Lamine Yamal",
            "games_played": 46,
            "minutes_played": 3720,
            "goals": 14,
            "assists": 18,
            "photo": "https://img.sofascore.com/api/v1/player/1402912/image",
            "number": 19,
            "heatmap": "/lamine.png"
        },
        {
            "id": 831005,
            "player_name": "Raphinha",
            "games_played": 48,
            "minutes_played": 3924,
            "goals": 30,
            "assists": 21,
            "photo": "https://img.sofascore.com/api/v1/player/831005/image",
            "number": 11,
            "heatmap": "/raphinha.png"
        }
    ]

    df = pd.DataFrame(data)
    return df
