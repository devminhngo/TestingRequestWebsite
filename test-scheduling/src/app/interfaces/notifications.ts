export interface Notification {
  _id: string,
  message: string,
  user: string,
  createdAt: string
}

export interface Notifications {
  total: Number,
  limit: Number,
  skip: Number,
  data: Array<Notification>
}
