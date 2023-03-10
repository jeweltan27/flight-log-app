from flask import Flask, request, jsonify
from os import error
from sqlalchemy import create_engine, text
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS, cross_origin
from flask_jwt_extended import create_access_token, JWTManager, jwt_required, get_jwt_identity
import decouple
from decouple import config
from flask_bcrypt import Bcrypt

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
app.config['CORS_HEADERS'] = 'Content-Type'

engine = create_engine("mysql+mysqlconnector://{username}:{password}@{hostname}".format(
    username=db_user, password=db_password, hostname=base_url
))
with engine.connect() as conn:
    create_db_query = text("CREATE DATABASE IF NOT EXISTS flight_log;")
    use_db_query = text("USE flight_log;")
    conn.execute(create_db_query)
    conn.execute(use_db_query) # select new db

db = SQLAlchemy(app)
bcrypt = Bcrypt(app)

CORS(app)

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

    def init(self, id, tailNumber, flightID, takeoff, landing, duration):
        self.id = id,
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

with app.app_context():
    db.create_all()
    
# JWT secret key
app.config["JWT_SECRET_KEY"] = config("SECRET_KEY")
jwt = JWTManager(app)

####################################################
####################################################
####################################################
####################################################
# User registration
@app.route("/user/register", methods=["POST"])
@cross_origin()
def register():
    username = request.json.get("username")
    userPassword = request.json.get("password")
    accessToken = create_access_token(identity=username)
    hashUserPassword = bcrypt.generate_password_hash(userPassword)

    newUser = User(
        username=username,
        userPassword=hashUserPassword,
        accessToken=accessToken
    )
    
    try:
        newUser.save_to_db()
    except error:
        return jsonify(
            {
                "code": 500,
                "data": {
                },
                "message": "Error registering user"
            }
        ), 500

    return jsonify(
        {
            "code": 201,
            "message": "User has been registered"
        }
    ), 201

# User authentication
@app.route("/user/authenticate", methods=["POST"])
@cross_origin()
def authenticate():
    username = request.json.get("username")
    password = request.json.get("userPassword")
    user = User.query.filter_by(username=username).first()
    if user:
        if bcrypt.check_password_hash(user.userPassword, password):
            # generate jwt token
            accessToken = create_access_token(identity=username)
            return jsonify(
                {
                    "accessToken": accessToken
                }
            ), 200
        return jsonify(
            {
                "code": 400,
                "message": "Invalid username or password"
            }
        ), 400
    else:
        return jsonify(
        {
            "code": 400,
            "message": "Your account does not exist."
        }), 400
    


# User endpoint
@app.route("/user", methods=["GET"])
@jwt_required()
def get_user():
    users = User.query.all()
    userArray = []
    
    try:
        for user in users:
            userArray.append({
                "username": user.username,
                "accessToken": user.accessToken
            })
    except:
        return jsonify(
            {
                "code": 400,
                "message": "Error retrieving users"
            }), 400        
    return jsonify(
        {
            "code": 200,
            "data": userArray,
            "message": "Retrieved all users"
        }), 200

# User by ID endpoint
@app.route("/user/<int:user_id>", methods=["DELETE"])
@jwt_required()
def delete_user(user_id):
    user = User.query.filter_by(id=user_id).first()
    
    if user:
        user.delete()
    
        return jsonify(
            {
                "code": 200,
                "message": "User has been deleted"
            }), 200
    return jsonify(
        {
            "message": "Error deleting user"
        }), 400
####################################################
####################################################
####################################################
####################################################

# FLIGHT LOGS
# Create new flightlog
@app.route("/flightLog", methods=["POST"])
@jwt_required()
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
@jwt_required()
def get_all_flightlog():
    
    try:
        flightLogs = FlightLog.query.all()
        
        flightLogsArray = []
        
        for flightlog in flightLogs:
            flightLogsArray.append({
                "id": flightlog.id,
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
@jwt_required()
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
@jwt_required()
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



if __name__ == "__main__":
    app.run(port=5000, debug=True)
