class UsersController {

  async test(req, res) {
    return  res.json({
      message: 'test route',
    });
  }
}

export const usersController = new UsersController();
