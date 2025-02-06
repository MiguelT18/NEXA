from app.models.base import BaseMixin
from app.extensions import db

class Predictions(BaseMixin, db.Model):
    """
    Modelo que representa las predicciones de precios de activos.

    Atributos heredados de BaseMixin:
    - id: Identificador único del registro.
    - date_created: Fecha y hora en que se creó el registro.
    - date_modified: Fecha y hora en que se modificó el registro.
    - status: Estado del registro (0 = inactivo, 1 = activo).

    Atributos específicos:
    - symbol: Símbolo del activo (e.g., BTC/USD).
    - date: Fecha y hora de la predicción.
    - predicted_price: Precio predicho del activo.
    - confidence: Nivel de confianza en la predicción (%).
    - model_version: Versión del modelo utilizado para la predicción.
    """
    __tablename__ = 'predictions'

    symbol = db.Column(db.String(10), nullable=False)
    date = db.Column(db.DateTime, nullable=False)
    predicted_price = db.Column(db.Numeric(15, 8), nullable=False)
    confidence = db.Column(db.Numeric(5, 2), nullable=True)
    model_version = db.Column(db.String(20), nullable=True)

    def __init__(self, symbol, date, predicted_price, confidence=None, model_version=None):
        """
        Inicializa una instancia de Predictions con los datos proporcionados.

        :param symbol: Símbolo del activo.
        :param date: Fecha y hora de la predicción.
        :param predicted_price: Precio predicho.
        :param confidence: Nivel de confianza en la predicción (opcional).
        :param model_version: Versión del modelo utilizado (opcional).
        """
        self.symbol = symbol
        self.date = date
        self.predicted_price = predicted_price
        self.confidence = confidence
        self.model_version = model_version

    def __repr__(self):
        return f"<Predictions {self.symbol} - {self.date} - {self.predicted_price}>"