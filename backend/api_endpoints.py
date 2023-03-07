from flask import Flask, request, jsonify
from os import error
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_jwt_extended import create_access_token, JWTManager, jwt_required, get_jwt_identity
import decouple
from decouple import config

base_url = config("BASE_URL")
db_user = config("DB_USER")
db_password = config("DB_PASSWORD")
db_name = config("DB_NAME")
app = Flask(__name__)

app.config["SQLALCHEMY_DATABASE_URI"] = "mysql+mysqlconnector://{username}:{password}@{hostname}/{databasename}".format(
    username=db_user, password=db_password, hostname=base_url, databasename=db_name
)
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SQLALCHEMY_ENGINE_OPTIONS"] = {"pool_recycle": 299}

db = SQLAlchemy(app)
CORS(app)

# JWT secret key
app.config["JWT_SECRET_KEY"] = config("SECRET_KEY")
jwt = JWTManager(app)

####################################################
####################################################
####################################################
####################################################

# FLIGHT LOGS
# Create new flightlog
@app.route("/flightLog", methods=["POST"])
def create_flightlog():
    print(request.json)
    tailNumber = request.json.get("tailNumber")
    flightID = request.json.get("flightID")
    takeoff = request.json.get("takeoff")
    landing = request.json.get("landing")
    duration = request.json.get("duration")
    
    newFlightLog = FlightLog(
        tailNumber=tailNumber,
        flightID=flightID,
        takeoff=takeoff,
        landing=landing,
        duration=duration
    )
    
    try:
        newFlightLog.save_to_db()
    except error:
        return jsonify(
            {
                "code": 400,
                "message": "Error creating flightlog."
            }
        ), 400

    return jsonify(
        {
            "code": 201,
            "message": "Flightlog has been created"
        }
    ), 201

####################################################
# Get all flightlogs
@app.route("/flightLog", methods=["GET"])
def get_all_flightlog():
    
    try:
        flightLogs = FlightLog.query.all()
        
        flightLogsArray = []
        
        for flightlog in flightLogs:
            flightLogsArray.append({
                "tailNumber": flightlog.tailNumber,
                "flightID": flightlog.flightID,
                "takeoff": flightlog.takeoff,
                "landing": flightlog.landing,
                "duration": flightlog.duration,
            })
        return jsonify({
            "code": 200,
            "data": flightLogsArray
        }), 200
    except:
        return jsonify({
            "message": "Error retrieving flightlogs"
        }), 500

####################################################
# Update flightlog
@app.route("/flightLog/<int:id>", methods=["PUT"])
def update_flightlog(id):
    
    flightlog = FlightLog.query.filter_by(id=id).first()

    tailNumber = request.json.get("tailNumber")
    flightID = request.json.get("flightID")
    takeoff = request.json.get("takeoff")
    landing = request.json.get("landing")
    duration = request.json.get("duration")
    
    if flightlog:
        print("Found flightlog in database")
        flightlog.tailNumber=tailNumber
        flightlog.flightID=flightID
        flightlog.takeoff=takeoff
        flightlog.landing=landing
        flightlog.duration=duration
        db.session.commit()
        
        return jsonify(
            {
                "message": "Updated flightlog"
            }), 201
    
    return jsonify(
        {
            "message": "Error updating flightlog"
        }), 400
    
####################################################
# Delete flightlog
@app.route("/flightLog/<int:id>", methods=["DELETE"])
def delete_flightlog(id):
    flightlog = FlightLog.query.filter_by(id=id).first()
    
    if flightlog:
        flightlog.delete()
    
        return jsonify(
            {
                "message": "Flightlog has been deleted"
            }), 200
        
    return jsonify(
        {
            "message": "Error deleting flightlog"
        }), 400


class User(db.Model):
    
    __tablename__ = "user"
    id = db.Column(db.Integer(), primary_key=True, autoincrement=True)
    username = db.Column(db.VARCHAR(255), nullable=False)
    userPassword = db.Column(db.VARCHAR(255), nullable=False)
    accessToken = db.Column(db.VARCHAR(255), nullable=True)

    def __init__(self, username, userPassword, accessToken):
        self.username = username
        self.userPassword = userPassword
        self.accessToken = accessToken
        
    def json(self):
        return {
            "username": self.username,
            "userPassword": self.userPassword,
            "accessToken": self.accessToken
        }
    
    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit() 
    
    
class FlightLog(db.Model):
    
    __tablename__ = "flightlog"
    id = db.Column(db.Integer(), primary_key=True)
    tailNumber = db.Column(db.VARCHAR(255), nullable=False)
    flightID = db.Column(db.VARCHAR(255), nullable=False)
    takeoff = db.Column(db.VARCHAR(255), nullable=False)
    landing = db.Column(db.VARCHAR(255), nullable=False)
    duration = db.Column(db.VARCHAR(255), nullable=False)

    def __init__(self, tailNumber, flightID, takeoff, landing, duration):
        self.tailNumber = tailNumber
        self.flightID = flightID
        self.takeoff = takeoff
        self.landing = landing
        self.duration = duration

        
    def json(self):
        return {
            "id": self.id,
            "tailNumber": self.tailNumber,
            "flightID": self.flightID,
            "takeoff": self.takeoff,
            "landing": self.landing,
            "duration": self.duration
        }
    
    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

if __name__ == "__main__":
    app.run(port=5000, debug=True)
