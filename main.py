from flask import Flask,request,jsonify,send_file
from flask_cors import CORS
import cv2
from pathlib import Path
from ultralytics import YOLO
import os
app = Flask(__name__)
CORS(app)
@app.route("/api/addUser",methods=["POST"])
def create_user():
    if 'image' in request.files:
        model = YOLO("best.pt")
        uploaded_file = request.files['image']
        print('salam')
        print(uploaded_file.filename)
        uploaded_file.save("api/public/" + uploaded_file.filename)
        img = cv2.imread("api/public/" + uploaded_file.filename)
        img=cv2.resize(img,(300,300))
        result = model(img)
        b = result[0].boxes.xywhn[0]
        x_center, y_center, box_width, box_height = b[0].item(), b[1].item(), b[2].item(), b[3].item()
        x_min = int((x_center - box_width / 2) * 300)
        y_min = int((y_center - box_height / 2) * 300)
        x_max = int((x_center + box_width / 2) * 300)
        y_max = int((y_center + box_height / 2) * 300)
        img = cv2.rectangle(img, (x_min, y_min), (x_max, y_max), (0,255,0), 2)
        cv2.imwrite("api/public/" + uploaded_file.filename, img)
        return str(uploaded_file.filename),200;
    else:
        return "error !"
if __name__ == '__main__':
    app.run(debug=False,port=8000);