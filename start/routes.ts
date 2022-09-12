import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.resource('/contents', 'ContentsController').apiOnly()
  Route.resource('/images', 'ImagesController').apiOnly()
  Route.get('/urls', 'ImagesController.url')
}).prefix('/api')
