from flask import Flask, request, json
import time
from chatbot import Chatbot

app = Flask(__name__)
chatbot = Chatbot(languages=('en', 'ar'), train=False)
chatbot.setup()


@app.route("/get", methods=["POST"])
def get_current_time():
    request_data = json.loads(request.data)
    # print(request_data)
    msg = request_data['msg']
    language = request_data['language']
    answer = chatbot.predict(msg,language)

    return {"msg": answer["answer"], "data": answer}


if __name__ == "__main__":
    app.run(debug=True, port="6000")
