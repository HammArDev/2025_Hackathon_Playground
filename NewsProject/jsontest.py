import json

file = open("static/test.json", "r")
obj=json.load(file)
obj["story4"]={"category": "Politics",
               "title":"Debatable: The Rise of Debate Clubs in High Schools",
               "priority": 4
               }
obj.length
del obj["story1"]
print(obj)

with open("static/test.json", "w") as fw:
    json.dump(obj, fw, indent=4)

