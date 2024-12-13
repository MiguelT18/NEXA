import os
import MetaTrader5 as mt5
from dotenv import load_dotenv
from core.executor import Executor

load_dotenv()

password = os.environ.get("PASSWORD")
account = os.environ.get("ACCOUNT")


def main():
    # establish MetaTrader 5 connection to a specified trading account
    if not mt5.initialize(login=int(account), server="Deriv-Demo", password=password):
        print("initialize() failed, error code:", mt5.last_error())
        quit()

    executor = Executor()
    balance = executor.get_balance()
    print(balance)


if __name__ == "__main__":
    main()
