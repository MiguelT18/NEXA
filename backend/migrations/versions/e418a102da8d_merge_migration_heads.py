"""Merge migration heads

Revision ID: e418a102da8d
Revises: 83a48fa1321e, d42b72a86ff8
Create Date: 2025-01-22 04:35:14.617533

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'e418a102da8d'
down_revision = ('83a48fa1321e', 'd42b72a86ff8')
branch_labels = None
depends_on = None


def upgrade():
    pass


def downgrade():
    pass
