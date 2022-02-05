from django.db import models
from datetime import datetime
from django.db.models.fields import CharField, TextField
from django.db.models.query import QuerySet
from django.template.defaultfilters import default, slugify
from rest_framework.fields import ImageField


class Contact(models.Model):
    name = models.CharField(max_length=200)
    email = models.CharField(max_length=100)
    message = models.TextField(blank=True)
    contact_date = models.DateTimeField(default=datetime.now, blank=True)

    def __str__(self):
        return self.email

class Testimonial(models.Model):
    testimonial_name = models.CharField(max_length=50)
    testimonial_title = models.CharField(max_length=70)
    testimonial_img = models.ImageField(upload_to='photos/%Y/%m/%d')
    testimonial_icon = models.ImageField(upload_to='photos/%Y/%m/%d')
    testimonial_desc = models.TextField(default=None, blank=True)
    testimonial_featured = models.BooleanField(default=False)

    class Meta:
        verbose_name_plural = "Testimonial"

    def __str__(self):
        return self.testimonial_name

class Profile(models.Model):
    name = models.CharField(max_length=50)
    work_title = models.CharField(max_length=70)
    work_desc = models.TextField(default=None, blank=True)
     

    class Meta:
        verbose_name_plural = "Profile"

    def arr_worktitle(self):
        if self.work_title:
            return self.work_title.split(",")
        else:
            None

    def __str__(self):
        return self.name

class Job(models.Model):
    job_name = models.CharField(max_length=100)
    job_icon = models.ImageField(upload_to='photos/%Y/%m/%d')
    job_desc = models.TextField(default=None)
    jobs_thumbnail = models.ImageField(upload_to='photos/%Y/%m/%d')

    class Meta:
        verbose_name_plural = "Job"

    def __str__(self):
        return self.job_name

class Portofolio_cat(models.Model):
    port_cat_name = models.CharField(max_length=50)
    
    class Meta:
        verbose_name_plural = "Portofolio Category"
        verbose_name = "Portofolio Category"
        ordering = ['id']
    
    def __str__(self):
        return self.port_cat_name
    
class Portofolio(models.Model):
    porto_cat_id = models.ForeignKey(Portofolio_cat, related_name='portfolios', on_delete=models.CASCADE, null=True)
    porto_title = models.CharField(max_length=50)
    porto_date = models.DateTimeField(default=datetime.now, blank=True)
    porto_thumbnail = models.ImageField(upload_to='photos/%Y/%m/%d')

    class Meta:
        verbose_name_plural = "Portofolio"

    def __str__(self):
        return self.porto_title

class Categories(models.Model):
    cat_title = models.CharField(max_length=50)
    url = models.CharField(max_length=50)

    class Meta:
        verbose_name_plural = "Categories"

    def __str__(self):
        return self.cat_title

class BlogPost(models.Model):
    cat_title_id = models.ForeignKey(Categories, related_name='posts', on_delete=models.CASCADE, null=True)
    title = models.CharField(max_length=50)
    slug = models.SlugField()
    thumbnail = models.ImageField(upload_to='photos/%Y/%m/%d/')
    excerpt = models.CharField(max_length=150)
    month = models.CharField(max_length=3)
    day = models.CharField(max_length=2)
    content = models.TextField(default=None)
    featured = models.BooleanField(default=False)
    date_created = models.DateTimeField(default=datetime.now, blank=True)

    def save(self, *args, **kwargs):
        original_slug = slugify(self.title)
        querySet = BlogPost.objects.all().filter(slug__iexact=original_slug).count()

        count = 1
        slug = original_slug
        while(querySet):
            slug = original_slug + '-' + str(count)
            count += 1
            querySet = BlogPost.objects.all().filter(slug__iexact=slug).count()

            # first-blog-post-slug
        self.slug = slug

        if self.featured:
            try:
                temp = BlogPost.objects.get(featured=True)
                if self != temp:
                    temp.featured = False
                    temp.save()
                
            except BlogPost.DoesNotExist:
                pass
        
        super(BlogPost, self).save(*args, **kwargs)
 
    def __str__(self):
        return self.title