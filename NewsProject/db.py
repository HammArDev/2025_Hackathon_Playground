import sqlite3, json

sql = sqlite3.connect("news.db")
cursor = sql.cursor()

file = open("static/test.json", "r")
jsontest = json.load(file)
jsontest = jsontest["stories"]
# print(jsontest[0]["title"])
# print(jsontest[0]["description"])
# print(jsontest[1]["priority"])
# print(jsontest[1]["author"])
# print(jsontest[1]["title"])
for st in jsontest:
    title = "\"" + st["title"] + "\""
    author = "\"" + st["author"] + "\""
    story = "\"" + st["story"] + "\""
    description = "\"" + st["description"] + "\""
    priority = st["priority"]
    category = "\"" + st["category"] + "\""
    length = st["length"]
    query = "INSERT INTO news VALUES({p}, {t}, {d}, {c}, {a}, {s}, {l})".format(p=priority, t=title, d=description, c=category, a=author, s=story, l=length)
    # print(query)
    cursor.execute(query)
    sql.commit()
sql.close()