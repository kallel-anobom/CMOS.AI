"""Adiciona tabela tasks"""

from alembic import op
import sqlalchemy as sa

# Revisão atual e anterior
revision = 'novo_hash'
down_revision = 'hash_anterior'
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        'tasks',
        sa.Column('id', sa.Integer(), primary_key=True),
        sa.Column('description', sa.String(), nullable=False),
        sa.Column('owner_id', sa.Integer(), sa.ForeignKey('users.id')),
    )


def downgrade():
    op.drop_table('tasks')
