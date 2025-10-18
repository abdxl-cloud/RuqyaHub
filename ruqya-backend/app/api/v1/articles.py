# app/api/v1/articles.py

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from sqlalchemy import func
from typing import List, Optional
from app.database import get_db
from app.models.article import Article
from app.schemas.article import ArticleResponse, ArticleListResponse
import random

router = APIRouter()

@router.get("/slug/{slug}", response_model=ArticleResponse)
async def get_article_by_slug(
    slug: str,
    db: Session = Depends(get_db)
):
    """Get a single article by slug"""
    article = db.query(Article).filter(
        Article.slug == slug,
        Article.is_published == True
    ).first()
    
    if not article:
        raise HTTPException(status_code=404, detail="Article not found")
    
    return article

@router.get("/{id}", response_model=ArticleResponse)
async def get_article_by_id(
    id: int,
    db: Session = Depends(get_db)
):
    """Get a single article by ID"""
    article = db.query(Article).filter(Article.id == id).first()
    
    if not article:
        raise HTTPException(status_code=404, detail="Article not found")
    
    return article

@router.get("/{id}/related", response_model=List[ArticleResponse])
async def get_related_articles(
    id: int,
    db: Session = Depends(get_db),
    limit: int = Query(default=3, le=10)
):
    """Get related articles based on category"""
    # First get the current article to find its category
    current_article = db.query(Article).filter(Article.id == id).first()
    
    if not current_article:
        raise HTTPException(status_code=404, detail="Article not found")
    
    # Get articles from the same category, excluding the current one
    related = db.query(Article).filter(
        Article.category == current_article.category,
        Article.id != id,
        Article.is_published == True
    ).order_by(func.random()).limit(limit).all()
    
    return related

@router.get("/", response_model=ArticleListResponse)
async def get_articles(
    skip: int = Query(default=0, ge=0),
    limit: int = Query(default=20, le=100),
    category: Optional[str] = None,
    is_published: bool = True,
    db: Session = Depends(get_db)
):
    """Get all articles with optional filtering"""
    query = db.query(Article)
    
    if is_published:
        query = query.filter(Article.is_published == True)
    
    if category:
        query = query.filter(Article.category == category)
    
    total = query.count()
    articles = query.order_by(Article.published_at.desc()).offset(skip).limit(limit).all()
    
    return {
        "total": total,
        "items": articles
    }

@router.get("/category/{category}", response_model=ArticleListResponse)
async def get_articles_by_category(
    category: str,
    skip: int = Query(default=0, ge=0),
    limit: int = Query(default=20, le=100),
    db: Session = Depends(get_db)
):
    """Get articles by category"""
    query = db.query(Article).filter(
        Article.category == category,
        Article.is_published == True
    )
    
    total = query.count()
    articles = query.order_by(Article.published_at.desc()).offset(skip).limit(limit).all()
    
    return {
        "total": total,
        "items": articles
    }
    