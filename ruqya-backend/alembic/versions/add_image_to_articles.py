"""add image to articles

Revision ID: add_image_to_articles
Revises: ca9402ca9ba8
Create Date: 2025-01-18 00:00:00.000000

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'add_image_to_articles'
down_revision = 'ca9402ca9ba8'
branch_labels = None
depends_on = None


def upgrade() -> None:
    # Add image column to articles table
    op.add_column('articles', sa.Column('image', sa.String(), nullable=True))


def downgrade() -> None:
    # Remove image column from articles table
    op.drop_column('articles', 'image')
