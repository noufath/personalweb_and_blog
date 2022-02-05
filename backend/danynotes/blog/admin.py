from django.contrib import admin
from django_summernote.admin import SummernoteModelAdmin
from .models import BlogPost, Categories, Portofolio, Portofolio_cat, Profile, Job, Testimonial
from .models import Contact

# Apply summernote to all TextField in model.
class BlogPostAdmin(SummernoteModelAdmin):  
    exclude = ('slug', )
    list_display = ('id', 'title', 'cat_title_id', 'date_created')
    list_display_links = ('id', 'title')
    search_fields = ('title', )
    list_per_page = 25
    summernote_fields = 'content'

class Category(SummernoteModelAdmin):
    list = ('id', 'cat_title', 'url')
    search_fields = ('cat_title',)

class Profiles(SummernoteModelAdmin):
    list = ('name', 'work_title')
    search_field = ('name')

class Portofolio_cats(SummernoteModelAdmin):
    list= ('port_cat_name')
    search_field = ('port_cat_name')

class Portofolios(SummernoteModelAdmin):
    list = ('porto_title')
    search_field = ('porto_title')

class Jobs(SummernoteModelAdmin):
    list = ('job_name', 'job_desc')

class Testimony(SummernoteModelAdmin):
    list = ('testimonial_name', 'testimonial_title')

class Contacts(admin.ModelAdmin):
    list_display = ('id', 'name', 'email')
    list_display_links = ('id', 'name')
    search_field = ('name', 'email')
    list_per_page = 25

admin.site.register(BlogPost, BlogPostAdmin)
admin.site.register(Categories, Category)
admin.site.register(Profile, Profiles)
admin.site.register(Portofolio_cat, Portofolio_cats)
admin.site.register(Portofolio, Portofolios)
admin.site.register(Job, Jobs)
admin.site.register(Testimonial, Testimony)
admin.site.register(Contact, Contacts)
