"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint, json
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from werkzeug.security import generate_password_hash
from flask_jwt_extended import JWTManager

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/signup', methods=['POST'])
def handle_user():
    data = request.data
    print("Datos recibidos:", data)
    data = json.loads(data)

    if 'email' not in data or 'password' not in data:
        return jsonify({"error": "Email and password are required."}), 400

    existing_user = User.query.filter_by(email=data['email']).first()
    if existing_user:
        return jsonify({"error": "User already exists."}), 400

    user = User(email=data['email'], password=data['password'], is_active=True)
    db.session.add(user)
    db.session.commit()

    response_body = {
        "email": data['email'],
        "ok": "true"
    }

    return jsonify(response_body), 201


@api.route('/login', methods=['POST'])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    user = User.query.filter_by(email=email, password=password).first()

    if user == None:
        return jsonify({"msg": "Bad username or password"}), 401
    
    access_token = create_access_token(identity=user.email)
    response_body = {
        "message": "Token created",
        "token": access_token
    }
    
    return jsonify(response_body), 200

@api.route('/private', methods=['GET'])
@jwt_required()
def handle_private():
    
    response_body = {
        "message": "This is a private route",
        "ok": "true",
        "user": get_jwt_identity()
    }

    return jsonify(response_body), 200