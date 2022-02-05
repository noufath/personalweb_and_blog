from django.urls import path
from rest_framework.serializers import as_serializer_error

from .views import BlogPostListView, BlogPostDetailView, BlogPostFeaturedView, BlogPostCategoryView, JobsView, PortoFolioView
from .views import CategoriesView, ProfileView, TestimonyView
from .views import PortoCategoryView
from .views import ContactView


urlpatterns = [
    path('', BlogPostListView.as_view()),
    path('featured', BlogPostFeaturedView.as_view()),
    path('category', BlogPostCategoryView.as_view()),
    path('<slug>', BlogPostDetailView.as_view()),
    path('list_category/', CategoriesView.as_view()),
    path('profile/', ProfileView.as_view()),
    path('jobs/', JobsView.as_view()),
    path('portofolio_category/', PortoCategoryView.as_view()),
    path('portofolios/', PortoFolioView.as_view()),
    path('testimonial/', TestimonyView.as_view()),
    path('contact/', ContactView.as_view()),
]