from django.db.models import fields
from django.http import request
from .models import BlogPost, Categories, Contact, Portofolio, Portofolio_cat, Profile, Job, Testimonial
from rest_framework import serializers


# Serializers define the API representation.
class BlogPostSerializer(serializers.ModelSerializer):
    cat_title = serializers.ReadOnlyField(source='cat_title_id.cat_title')
    
    class Meta:
        model = BlogPost
        fields = ('id', 'title', 'slug', 'thumbnail', 'excerpt', 'month', 'day', 'content', 'featured', 'date_created', 'cat_title_id', 'cat_title')
        lookup_field = 'slug'

    def get_image_url(self, obj):
        request = self.context.get("request")
        thumbnail_url = obj.thumbnail.url
        return request.build_absolute_uri(thumbnail_url)
    

class CategoriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categories
        fields = ('id', 'cat_title', 'url')
        lookup_field = 'id'
    
class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ('name', 'work_desc', 'work_title', 'arr_worktitle')
        lookup_field = 'name'

    def get_arr_worktitle(self, Profile):
        return ProfileSerializer(Profile.arr_worktitle()).data

        
class JobsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Job
        fields = ('id', 'job_name', 'job_desc', 'job_icon', 'jobs_thumbnail')
        lookup_field = 'job_name' 

class PortofolioSerializer(serializers.ModelSerializer):
    port_cate = serializers.ReadOnlyField(source='porto_cat_id.port_cat_name')

    
    class Meta:
        model = Portofolio
        fields = ('id', 'porto_title', 'porto_thumbnail', 'port_cate')
        lookup_field = 'porto_title'

class PortofolioCatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Portofolio_cat
        fields = ('id', 'port_cat_name')
        lookup_field = 'port_cat_name'

class TestimonialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Testimonial
        fields =  ('id', 'testimonial_name', 'testimonial_title', 'testimonial_img', 'testimonial_icon', 'testimonial_desc')
        lookup_field = 'testimonial_name'

class ConctactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = '__all__'