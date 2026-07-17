"""add alert delivery status

Revision ID: e7c1d9a4f2b8
Revises: b2e7a4c8d3f1
Create Date: 2026-07-05 00:00:00.000000

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'e7c1d9a4f2b8'
down_revision: Union[str, Sequence[str], None] = 'b2e7a4c8d3f1'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    # Nullable: alerts sent before callbacks were enabled simply have no
    # delivery information.
    op.add_column('alerts', sa.Column('delivery_status', sa.String(length=20), nullable=True))
    op.add_column('alerts', sa.Column('delivery_status_at', sa.DateTime(timezone=True), nullable=True))


def downgrade() -> None:
    """Downgrade schema."""
    op.drop_column('alerts', 'delivery_status_at')
    op.drop_column('alerts', 'delivery_status')
