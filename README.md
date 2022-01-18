# Project template :
https://www.youtube.com/watch?v=BKz7rnbQyK4&list=PLzYM-WGWIJDR7K5GJPeYR74xKcxhE_lfw&index=2

# Folders structure :
https://github.com/jonasschmedtmann/complete-node-bootcamp/tree/master/4-natours <br />


# Users endpoint

Base url: '/api/v1/users'

## Get all users

endpoint: '/getAllUsers' <br />
method: GET <br />
authentication: true <br />
request body: empty <br />

## Reset Password

endpoint: '/resetPassword/:token' <br />
method: PATCH <br />
authentication: false <br />
request body: { <br />
  password: '123456'
}

## Get User

endpoint: '/:id' <br />
method: GET <br />
authentication: true <br />
request body: { <br />
  userID: '1'
}

## Sign up

endpoint: '/signup' <br />
method: POST <br />
authentication: false <br />
request body: { <br />
  email: 'johndoe@gmail.com' <br />
  password: 'strongPassword' <br />
  firstName: 'John', <br />
  lastName: 'Doe' <br />
}

## Login

endpoint: '/login' <br />
method: POST <br />
authentication: false <br />
request body: { <br />
  email: 'johndoe@gmail.com' <br />
  password: 'strongPassword' <br />
}

## Forgot Password

endpoint: '/forgotPassword' <br />
method: POST <br />
authentication: false <br />
request body: { <br />
  email: 'johndoe@gmail.com' <br />
}

## Update password

endpoint: '/updatePassword' <br />
method: PATCH <br />
authentication: true <br />
request body: { <br />
  userID : '1' <br />
  password : 'strongPassword' <br />
  newPassword : 'newStrongPassword' <br />
}

## Update user

endpoint: '/updateUser' <br />
method: PATCH <br />
authentication: true <br />
request body: { <br />
  userID : '1' <br />
  email: 'johndoe@gmail.com' <br />
  firstName: 'John', <br />
  lastName: 'Doe' <br />
}

## Delete user

endpoint: '/deleteUser' <br />
method: DELETE <br />
authentication: true <br />
request body: { <br />
  userID : 1 <br />
}

userID should be a number! <br />

## Logout

endpoint: '/logout' <br />
method: post <br />
authentication: true <br />
request body: empty <br />

# Posts endpoint

Base url: '/api/v1/posts'

## Get all posts

endpoint: '/getAllPosts' <br />
method: GET <br />
authentication: true <br />
request body: empty <br />

## Create post

endpoint: '/createPost' <br />
method: POST <br />
authentication: true <br />
request body: { <br />
  userID : '1' <br />
  post: 'New Post' <br />
  title: 'New Title' <br />
}

## Update post

endpoint: '/updatePost' <br />
method: PATCH <br />
authentication: true <br />
request body: { <br />
  postID : '1' <br />
  post: 'New Post' <br />
  title: 'New Title' <br />
}

## Delete post

endpoint: '/deletePost' <br />
method: DELETE <br />
authentication: true <br />
request body: { <br />
  postID : '1' <br />
}

## Get user post

endpoint: /getUserPosts' <br />
method: GET <br />
authentication: true <br />
request body: { <br />
  userID : '1' <br />
}

# Comments endpoint

Base url: '/api/v1/comments'

## Post comment

endpoint: '/postComment' <br />
method: POST <br />
authentication: true <br />
request body: { <br />
  userID : '1' <br />
  postID : '1' <br />
  comment : 'cool post' <br />
}

## Update comment

endpoint: '/updateComment' <br />
method: POST <br />
authentication: true <br />
request body: { <br />
  userID : '1' <br />
  postID : '1' <br />
  commentID : '1' <br />
  comment : 'new comment' <br />
}

## Delete comment

endpoint: /deleteComment' <br />
method: DELETE <br />
authentication: true <br />
request body: { <br />
  userID : '1' <br />
  postID : '1' <br />
  commentID : '1' <br />
}
