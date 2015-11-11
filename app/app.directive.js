margPhotos.directive('loadPhoto', function () {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      element.bind('load', function () {
        scope.post.imageLoaded.status = true;
      });
      element.bind('error', function () {
        scope.post.imageLoaded.error = true;
      });
    }
  };
});