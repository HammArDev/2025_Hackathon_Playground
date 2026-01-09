from flask import Flask, render_template, request, jsonify, redirect
import sqlite3
app = Flask(__name__)

def sql_connection():
    conn = None
    try:
        conn = sqlite3.connect('news.db')
    except sqlite3.Error as e:
        print(e)
    return conn

def update_length():
    conn = sql_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT max(priority) FROM news")
    max = cursor.fetchone()[0]
    conn.close()
    return max

allStoriesLength = update_length()
@app.route('/')
def hello_world():# put application's code here
    v=True
    return render_template("index.html", value=v, allStoriesLength=allStoriesLength), 200

@app.route('/change/', methods=['POST'])
def edit():
    form = request.form
    if(form['actions'] == 'Edit'):
        return render_template("edit.html",allStoriesLength=allStoriesLength), 200
    elif (form['actions'] == 'Delete'):
        return render_template("delete.html", allStoriesLength = allStoriesLength), 200
    elif (form['actions'] == 'Add'):
        return render_template("add.html", allStoriesLength = allStoriesLength), 200
    else:
        return redirect(request.url_root)

@app.route("/about/")
def about():
    print("hi")
    return render_template('about.html'), 200

@app.route("/changeStory/<int:priorNum>", methods = ["POST"])
def changeStory(priorNum):
    # check if priorNum is valid
    min = 1
    if(priorNum > allStoriesLength or priorNum < min):
        return "Invalid priority number: Should be between 1 and {}".format(allStoriesLength), 400
    form = request.form
    conn = sql_connection()
    cursor = conn.cursor()
    #Formulate the query
    query = """UPDATE news
    SET priority = priority"""
    for key in form.keys():
        query += ",\n\t{k} = \"{v}\"".format(k=key, v = form[key])
    query += "\nWHERE priority = {}".format(priorNum)
    # print(query)
    cursor.execute(query)
    conn.commit()
    conn.close()
    return "Successful Change", 200

@app.route("/changePriority/<int:fromPrior>/<int:toPrior>", methods = ["GET"])
def changePriority(fromPrior, toPrior):
    #Check if the priority number is in range
    theMin = 1
    if(fromPrior > allStoriesLength or fromPrior < theMin):
        return "The starting priority number is invalid", 400
    conn = sql_connection()
    cursor = conn.cursor()
    if(toPrior > allStoriesLength or toPrior < theMin):
        return "The ending priority number is invalid", 400
    query = """UPDATE news
        SET priority = ?
        WHERE priority = ?"""
    try:
        cursor.execute(query, (max+1, toPrior))
        cursor.execute(query, (toPrior, fromPrior))
        cursor.execute(query, (fromPrior, max+1))
    except sqlite3.Error as e:
        return "Something went wrong", 500
    conn.commit()
    conn.close()
    return "Sucessful switch", 200

@app.route("/retrieve/<int:prior>/<string:value>")
def retrieve(prior, value):
    # Check if the priority number is in range
    min = 1
    if(prior > allStoriesLength or prior < min):
        return "The priority number doesn't work", 400
    conn = sql_connection()
    cursor = conn.cursor()
    query = "SELECT {} FROM news WHERE priority = ?".format(value)
    cursor.execute(query, (prior,))
    ret = cursor.fetchone()[0]
    print(ret)
    conn.close()
    return ret, 200

@app.route("/deleteStory")
def deleteStory():
    args = request.args
    prior = args["deletion-number"]
    conn = sql_connection()
    query = """DELETE FROM news WHERE priority = ?"""
    conn.execute(query, (prior,))
    conn.commit()
    query = """UPDATE news
    SET priority = priority-1
            WHERE priority > ?"""
    cursor = conn.cursor()
    cursor.execute(query, (prior,))
    conn.commit()
    conn.close()
    allStoriesLength = update_length()
    return "Successful Delete", 200

@app.route("/filterStories/<string:category>")
def filterStories(category):
    conn = sql_connection()
    cursor = conn.cursor()
    query = """SELECT * FROM news WHERE category = ?"""
    if category == "politics":
        cursor.execute(query, ("Politics", ))
    elif category == "environment":
        cursor.execute(query, ("Environment", ))
    elif category == "sports":
        cursor.execute(query, ("Sports", ))
    else:
        cursor.execute(query.replace("?", "category"))
    # Formatting the information
    selected = []
    for row in cursor.fetchall():
        selected.append(dict(priority=row[0], title=row[1], description=row[2], category=row[3], author=row[4], story=row[5], length=row[6]))
    return jsonify(selected), 200

@app.route("/addStory", methods = ["POST"])
def addStory():
    form = request.form
    conn = sql_connection()
    cursor = conn.cursor()
    # Shift the priorities
    startPrior = int(form["priority"])
    query = """UPDATE news
        SET priority = priority+1
            WHERE priority = ?"""
    theMax = update_length()
    changeIndices = list(range(startPrior, theMax+1))
    changeIndices.reverse()
    print(changeIndices)
    for i in changeIndices:
        cursor.execute(query, (i, ))
        print(i)
    newQuery = """INSERT INTO news VALUES(?, ?, ?, ?, ?, ?, ?, false)"""
    conn.execute(newQuery, (startPrior, form["title"], form["description"], form["category"], form["author"], form["story"], float(form["length"])))
    conn.commit()
    allStoriesLength = update_length()
    return "Story added successfully", 200
@app.route("/<string:category>", methods = ["GET"])
def route(category):
    if category == "politics":
        return render_template("filtered.html", category=category, color='indianred'), 200
    elif category == "environment":
        return render_template("filtered.html", category=category, color='mediumspringgreen'), 200
    elif category == "sports":
        return render_template("filtered.html", category=category, color='skyblue'), 200
    else:
        return "Something went wrong with the internal JS--It routed you to an invalid category filter, sorry", 404
if __name__=="__main__":
    app.run()