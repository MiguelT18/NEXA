from app.models.base import BaseMixin
from app.extensions import db

class Trade(BaseMixin, db.Model):
    """
    Modelo que representa una transacción (compra o venta) de un activo por parte de un usuario.

    Atributos heredados de BaseMixin:
    - id: Identificador único del registro.
    - date_created: Fecha y hora de creación del registro.
    - date_modified: Fecha y hora de última modificación del registro.
    - status: Estado del registro (0 = inactivo, 1 = activo).

    Atributos específicos:
    - user_id: ID del usuario asociado a la operación.
    - symbol: Símbolo del activo negociado.
    - trade_type: Tipo de operación (compra o venta).
    - quantity: Cantidad negociada del activo.
    - price: Precio al que se realizó la operación.
    - date: Fecha de la operación (solo la fecha, sin hora).
    - fees: Comisión aplicada a la operación.

    Relaciones:
    - user: Relación con el modelo User, permitiendo acceder a los datos del usuario asociado.
    """

    __tablename__ = 'trades'

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=True)
    symbol = db.Column(db.String(10), nullable=False)
    trade_type = db.Column(db.String(10), nullable=False)
    quantity = db.Column(db.Numeric(20, 8), nullable=False)
    price = db.Column(db.Numeric(15, 8), nullable=False)
    date = db.Column(db.Date, nullable=False)  # Solo la fecha sin hora
    fees = db.Column(db.Numeric(10, 8), nullable=False)

    user = db.relationship('User', backref=db.backref('trades', lazy=True))

    def __init__(self, user_id, symbol, trade_type, quantity, price, date, fees):
        """
        Constructor de la clase Trade.

        :param user_id: ID del usuario asociado a la operación.
        :param symbol: Símbolo del activo.
        :param trade_type: Tipo de operación ('buy' o 'sell').
        :param quantity: Cantidad negociada.
        :param price: Precio al que se realizó la operación.
        :param date: Fecha de la operación.
        :param fees: Comisión aplicada a la operación.
        """
        self.user_id = user_id
        self.symbol = symbol
        self.trade_type = trade_type
        self.quantity = quantity
        self.price = price
        self.date = date
        self.fees = fees

    def __repr__(self):
        return f"<Trade {self.trade_type} {self.quantity} {self.symbol} at {self.price}>"