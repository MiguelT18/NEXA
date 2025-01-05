import os
import MetaTrader5 as mt5
from dotenv import load_dotenv

load_dotenv()


class Broker:
    def __init__(self):
        self.password = os.environ.get("PASSWORD")
        self.account = os.environ.get("ACCOUNT")
        self.server = "Deriv-Demo"

    def initialize_broker(self):
        if not mt5.initialize(login=int(self.account), server=self.server, password=self.password):
            raise ConnectionError("Error al inicializar MetaTrader5, error code:",
                                  mt5.last_error())

    def run(self):
        try:
            self.initialize_broker()
        except Exception as e:
            print(e)
        finally:
            mt5.shutdown()
