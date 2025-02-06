from app.models.base import BaseMixin
from app.extensions import db

class MarketData(BaseMixin, db.Model):
    """
    Modelo que representa los datos de mercado de un activo financiero.

    Atributos heredados de BaseMixin:
    - id: Identificador único del registro.
    - date_created: Fecha y hora de creación.
    - date_modified: Fecha y hora de última modificación.
    - status: Estado del registro (1 = activo, 0 = inactivo).

    Atributos específicos:
    - symbol: Símbolo del activo (e.g., BTC/USD).
    - date: Fecha y hora de los datos de mercado.
    - open: Precio de apertura.
    - high: Precio más alto.
    - low: Precio más bajo.
    - close: Precio de cierre.
    - volume: Volumen negociado.
    - source: Fuente de los datos (e.g., Binance, Coinbase).
    """
    __tablename__ = 'market_data'

    symbol = db.Column(db.String(10), nullable=False, comment="Símbolo del activo (e.g., BTC/USD)")
    date = db.Column(db.DateTime, nullable=False, comment="Fecha y hora de los datos")
    open = db.Column(db.Numeric(15, 8), nullable=False, comment="Precio de apertura")
    high = db.Column(db.Numeric(15, 8), nullable=False, comment="Precio más alto")
    low = db.Column(db.Numeric(15, 8), nullable=False, comment="Precio más bajo")
    close = db.Column(db.Numeric(15, 8), nullable=False, comment="Precio de cierre")
    volume = db.Column(db.Numeric(20, 8), nullable=False, comment="Volumen negociado")
    source = db.Column(db.String(50), nullable=True, comment="Fuente de los datos (e.g., Binance, Coinbase)")

    def __init__(self, symbol, date, open_price, high, low, close, volume, source=None):
        """
        Inicializa una instancia de MarketData.

        :param symbol: Símbolo del activo.
        :param date: Fecha y hora de los datos.
        :param open_price: Precio de apertura.
        :param high: Precio más alto.
        :param low: Precio más bajo.
        :param close: Precio de cierre.
        :param volume: Volumen negociado.
        :param source: Fuente de los datos (opcional).
        """
        self.symbol = symbol
        self.date = date
        self.open = open_price
        self.high = high
        self.low = low
        self.close = close
        self.volume = volume
        self.source = source

    def __repr__(self):
        return f"<MarketData {self.symbol} {self.date} Close: {self.close}>"