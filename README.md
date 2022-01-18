# Project template :
https://www.youtube.com/watch?v=BKz7rnbQyK4&list=PLzYM-WGWIJDR7K5GJPeYR74xKcxhE_lfw&index=2

# Folders structure :
https://github.com/jonasschmedtmann/complete-node-bootcamp/tree/master/4-natours &nbsp;


# Users endpoint

Base url: '/api/v1/users'

## Get all users

endpoint: '/getAllUsers' &nbsp;
method: GET &nbsp;
authentication: true &nbsp;
request body: empty &nbsp;

## Reset Password

endpoint: '/resetPassword/:token' &nbsp;
method: PATCH &nbsp;
authentication: false &nbsp;
request body: { &nbsp;
  password: '123456'
}

## Get User

endpoint: '/:id' &nbsp;
method: GET &nbsp;
authentication: true &nbsp;
request body: { &nbsp;
  userID: '1'
}

## Sign up

endpoint: '/signup' &nbsp;
method: POST &nbsp;
authentication: false &nbsp;
request body: { &nbsp;
  email: 'johndoe@gmail.com' &nbsp;
  password: 'strongPassword' &nbsp;
  firstName: 'John', &nbsp;
  lastName: 'Doe' &nbsp;
}

## Login

endpoint: '/login' &nbsp;
method: POST &nbsp;
authentication: false &nbsp;
request body: { &nbsp;
  email: 'johndoe@gmail.com' &nbsp;
  password: 'strongPassword' &nbsp;
}

## Forgot Password

endpoint: '/forgotPassword' &nbsp;
method: POST &nbsp;
authentication: false &nbsp;
request body: { &nbsp;
  email: 'johndoe@gmail.com' &nbsp;
}

## Update password

endpoint: '/updatePassword' &nbsp;
method: PATCH &nbsp;
authentication: true &nbsp;
request body: { &nbsp;
  userID : '1' &nbsp;
  password : 'strongPassword' &nbsp;
  newPassword : 'newStrongPassword' &nbsp;
}

## Update user

endpoint: '/updateUser' &nbsp;
method: PATCH &nbsp;
authentication: true &nbsp;
request body: { &nbsp;
  userID : '1' &nbsp;
  email: 'johndoe@gmail.com' &nbsp;
  firstName: 'John', &nbsp;
  lastName: 'Doe' &nbsp;
}

## Delete user

endpoint: '/deleteUser' &nbsp;
method: DELETE &nbsp;
authentication: true &nbsp;
request body: { &nbsp;
  userID : 1 &nbsp;
}

userID should be a number! &nbsp;

## Logout

endpoint: '/logout' &nbsp;
method: post &nbsp;
authentication: true &nbsp;
request body: empty &nbsp;

# Posts endpoint

Base url: '/api/v1/posts'

## Get all posts

endpoint: '/getAllPosts' &nbsp;
method: GET &nbsp;
authentication: true &nbsp;
request body: empty &nbsp;

## Create post

endpoint: '/createPost' &nbsp;
method: POST &nbsp;
authentication: true &nbsp;
request body: { &nbsp;
  userID : '1' &nbsp;
  post: 'New Post' &nbsp;
  title: 'New Title' &nbsp;
}

## Update post

endpoint: '/updatePost' &nbsp;
method: PATCH &nbsp;
authentication: true &nbsp;
request body: { &nbsp;
  postID : '1' &nbsp;
  post: 'New Post' &nbsp;
  title: 'New Title' &nbsp;
}

## Delete post

endpoint: '/deletePost' &nbsp;
method: DELETE &nbsp;
authentication: true &nbsp;
request body: { &nbsp;
  postID : '1' &nbsp;
}

## Get user post

endpoint: /getUserPosts' &nbsp;
method: GET &nbsp;
authentication: true &nbsp;
request body: { &nbsp;
  userID : '1' &nbsp;
}

# Comments endpoint

Base url: '/api/v1/comments'

## Post comment

endpoint: '/postComment' &nbsp;
method: POST &nbsp;
authentication: true &nbsp;
request body: { &nbsp;
  userID : '1' &nbsp;
  postID : '1' &nbsp;
  comment : 'cool post' &nbsp;
}

## Update comment

endpoint: '/updateComment' &nbsp;
method: POST &nbsp;
authentication: true &nbsp;
request body: { &nbsp;
  userID : '1' &nbsp;
  postID : '1' &nbsp;
  commentID : '1' &nbsp;
  comment : 'new comment' &nbsp;
}

## Delete comment

endpoint: /deleteComment' &nbsp;
method: DELETE &nbsp;
authentication: true &nbsp;
request body: { &nbsp;
  userID : '1' &nbsp;
  postID : '1' &nbsp;
  commentID : '1' &nbsp;
}
