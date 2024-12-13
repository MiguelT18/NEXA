import MetaTrader5 as mt5


class Executor:
    def __init__(self):
        if not mt5.initialize():
            print("Error al inicializar MetaTrader5, error code:", mt5.last_error())
            mt5.shutdown()

    def get_balance(self):
        account_info = mt5.account_info()
        if account_info is None:
            print("Error al obtener información de la cuenta, error code:",
                  mt5.last_error())
            return None
        return account_info.balance
