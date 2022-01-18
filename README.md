# Project template :
https://www.youtube.com/watch?v=BKz7rnbQyK4&list=PLzYM-WGWIJDR7K5GJPeYR74xKcxhE_lfw&index=2

#Folders structure :
https://github.com/jonasschmedtmann/complete-node-bootcamp/tree/master/4-natours &nbsp;


# Users endpoint

Base url: '/api/v1/users'

## Get all users

endpoint: '/getAllUsers'
method: GET
authentication: true
request body: empty

## Reset Password

endpoint: '/resetPassword/:token'
method: PATCH
authentication: false
request body: {
  password: '123456'
}

## Get User

endpoint: '/:id'
method: GET
authentication: true
request body: {
  userID: '1'
}

## Sign up

endpoint: '/signup'
method: POST
authentication: false
request body: {
  email: 'johndoe@gmail.com'
  password: 'strongPassword'
  firstName: 'John',
  lastName: 'Doe'
}

## Login

endpoint: '/login'
method: POST
authentication: false
request body: {
  email: 'johndoe@gmail.com'
  password: 'strongPassword'
}

## Forgot Password

endpoint: '/forgotPassword'
method: POST
authentication: false
request body: {
  email: 'johndoe@gmail.com'
}

## Update password

endpoint: '/updatePassword'
method: PATCH
authentication: true
request body: {
  userID : '1'
  password : 'strongPassword'
  newPassword : 'newStrongPassword'
}

## Update user

endpoint: '/updateUser'
method: PATCH
authentication: true
request body: {
  userID : '1'
  email: 'johndoe@gmail.com'
  firstName: 'John',
  lastName: 'Doe'
}

## Delete user

endpoint: '/deleteUser'
method: DELETE
authentication: true
request body: {
  userID : 1
}

userID should be a number!

## Logout

endpoint: '/logout'
method: post
authentication: true
request body: empty

# Posts endpoint

Base url: '/api/v1/posts'

## Get all posts

endpoint: '/getAllPosts'
method: GET
authentication: true
request body: empty

## Create post

endpoint: '/createPost'
method: POST
authentication: true
request body: {
  userID : '1'
  post: 'New Post'
  title: 'New Title'
}

## Update post

endpoint: '/updatePost'
method: PATCH
authentication: true
request body: {
  postID : '1'
  post: 'New Post'
  title: 'New Title'
}

## Delete post

endpoint: '/deletePost'
method: DELETE
authentication: true
request body: {
  postID : '1'
}

## Get user post

endpoint: /getUserPosts'
method: GET
authentication: true
request body: {
  userID : '1'
}

# Comments endpoint

Base url: '/api/v1/comments'

## Post comment

endpoint: '/postComment'
method: POST
authentication: true
request body: {
  userID : '1'
  postID : '1'
  comment : 'cool post'
}

## Update comment

endpoint: '/updateComment'
method: POST
authentication: true
request body: {
  userID : '1'
  postID : '1'
  commentID : '1'
  comment : 'new comment'
}

## Delete comment

endpoint: /deleteComment'
method: DELETE
authentication: true
request body: {
  userID : '1'
  postID : '1'
  commentID : '1'
}
