from django.db import models

class Customer(models.Model):
	first_name = models.CharField("First name", max_length=55)
	last_name = models.CharField("Last name", max_length=50)
	email = models.EmailField()
	phone = models.CharField(max_length=20)
	address =  models.CharField("Address", max_length=200)
	description = models.CharField("description", max_length=200)
	createdAt = models.DateTimeField("Created At", auto_now_add=True)
	
	def __str__(self):
		return self.first_name