const services = [
  {
    route: '/auth',
    target: 'http://auth-service:5200/auth',
  },
  {
    route: '/jobs',
    target: 'http://job-service:5300/jobs',
  },
]

module.exports = services

