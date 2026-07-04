"""add alert feedback counts to regional_stats

Revision ID: b2e7a4c8d3f1
Revises: 8f1d2c3b4a5e
Create Date: 2026-07-04 00:00:00.000000

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'b2e7a4c8d3f1'
down_revision: Union[str, Sequence[str], None] = '8f1d2c3b4a5e'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    # server_default backfills existing snapshots with 0 (no feedback yet
    # counted); the nightly job overwrites on its next run.
    op.add_column('regional_stats', sa.Column('alerts_feedback_yes', sa.Integer(), server_default='0', nullable=False))
    op.add_column('regional_stats', sa.Column('alerts_feedback_no', sa.Integer(), server_default='0', nullable=False))


def downgrade() -> None:
    """Downgrade schema."""
    op.drop_column('regional_stats', 'alerts_feedback_no')
    op.drop_column('regional_stats', 'alerts_feedback_yes')
