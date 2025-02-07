"""Fusionar migraciones

Revision ID: f30f2e793a27
Revises: a7e41af2aa69, ab76734d740e, ae4fefb56f90
Create Date: 2025-02-07 11:16:40.417647

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'f30f2e793a27'
down_revision = ('a7e41af2aa69', 'ab76734d740e', 'ae4fefb56f90')
branch_labels = None
depends_on = None


def upgrade():
    pass


def downgrade():
    pass
