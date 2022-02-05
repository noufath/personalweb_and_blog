from typing import List
from django.db.models.query import QuerySet
from rest_framework.response import Response
from rest_framework import generics, permissions, serializers
from rest_framework.views import APIView
from django.core.mail import send_mail


from blog.models import BlogPost, Categories, Portofolio, Profile, Job, Portofolio_cat, Testimonial, Contact
from blog.serializers import BlogPostSerializer, JobsSerializer, PortofolioSerializer, TestimonialSerializer
from blog.serializers import CategoriesSerializer
from blog.serializers import ProfileSerializer
from blog.serializers import PortofolioCatSerializer
from danynotes.settings import EMAIL_HOST_PASSWORD, EMAIL_HOST_USER, EMAIL_USE_TLS
 
class BlogPostListView(generics.ListAPIView):
    permissions_classes = (permissions.AllowAny, )
    queryset = BlogPost.objects.order_by('-date_created')
    serializer_class = BlogPostSerializer
    lookup_field = 'slug'
    
class BlogPostDetailView(generics.RetrieveAPIView):
    permissions_classes = (permissions.AllowAny, )
    queryset = BlogPost.objects.order_by('-date_created')
    serializer_class = BlogPostSerializer
    lookup_field = 'slug'


class BlogPostFeaturedView(generics.ListAPIView):
    permissions_classes = (permissions.AllowAny, )
    queryset = BlogPost.objects.all().filter(featured=True)
    serializer_class = BlogPostSerializer
    lookup_field = 'slug'


class BlogPostCategoryView(APIView):
    permissions_classes = (permissions.AllowAny, )
    serializer_class = BlogPostSerializer
    


    def post(self, request, format=None):
        data = self.request.data
        cat_title_id = data['cat_title_id']
        queryset = BlogPost.objects.order_by('-date_created').filter(cat_title_id=cat_title_id)
        serializer = BlogPostSerializer(queryset, context={"request": request}, many=True)
        return Response(serializer.data)

class CategoriesView(generics.ListAPIView):
    permissions_classes = (permissions.AllowAny, )
    queryset = Categories.objects.order_by('id')
    serializer_class = CategoriesSerializer
    lookup_field = 'cat_title'


class ProfileView(generics.ListAPIView):
    permissions_classes = (permissions.AllowAny, )
    queryset = Profile.objects.order_by('name')
    serializer_class = ProfileSerializer
    lookup_field = 'name'


class JobsView(generics.ListAPIView):
    permissions_classes = (permissions.AllowAny, )
    queryset = Job.objects.order_by('job_name')
    serializer_class = JobsSerializer
    lookup_field = 'job_name'


class PortoCategoryView(generics.ListAPIView):
    permissions_classes = (permissions.AllowAny, )
    queryset = Portofolio_cat.objects.order_by('id')
    serializer_class = PortofolioCatSerializer
    lookup_field = 'port_cat_name'


class PortoFolioView(APIView):
    permissions_classes = (permissions.AllowAny, )
    serializer_class = PortofolioSerializer
    

    def post(self, request, format=None):
        data = self.request.data
        porto_cat_id = data['porto_cat_id']
        queryset = Portofolio.objects.order_by('-porto_date').filter(porto_cat_id=porto_cat_id)
        serializer = PortofolioSerializer(queryset, context={"request": request}, many=True)
        return Response(serializer.data)

class TestimonyView(generics.ListAPIView):
    permissions_classes = (permissions.AllowAny, )
    queryset = Testimonial.objects.order_by('id')
    serializer_class = TestimonialSerializer
    lookup_field = 'testimonial_name'

class ContactView(APIView):
    permissions_classes = (permissions.AllowAny, )

    def post(self, request, format=None):
        data = self.request.data
        subject = 'danynotes - ' + data['name']
        name = data['name']
        message = data['message']
        from_email = data['email']

        print(from_email)
    
        try:
            send_mail(subject, message, from_email, [EMAIL_HOST_USER], fail_silently= False)

            contact = Contact(name=name, email=from_email, message=message)
            contact.save()

            return Response({'success': 'Message sent successfully'})
        
        except:
            return Response({'error': 'Message failed to send'})