const {User, Profile, Category, Company, Investment} =  require("../models")
const bcrypt = require('bcryptjs')
const currency = require('../helper/currency')
const { Op } = require("sequelize");

class Controller {
  static async LandingPage(req, res) {
    try {
      res.render("landingpage");
    } catch (error) {
      res.send(error);
    }
  }
  static async getSignUp(req, res) {
    try {
      res.render("registerform");
    } catch (error) {
      res.send(error);
    }
  }
  static async postSignUp(req, res) {
    try {
      const { email, password } = req.body;
      let new_user = await User.create({ email, password });
      await Profile.create({ UserId: new_user.id });
      res.redirect("/signin");
    } catch (error) {
      res.send(error);
    }
  }

  static async getSignIn(req, res) {
    try {
      const { error } = req.query;
      res.render("loginform", { error });
    } catch (error) {
      res.send(error);
    }
  }

  static async postSignIn(req, res) {
    try {
      const { email, password } = req.body;
      let dataUser = await User.findOne({
        where: { email },
      });
      if (dataUser) {
        const isValidPassword = bcrypt.compareSync(password, dataUser.password);
        if (isValidPassword) {
          req.session.UserId = dataUser.id;
          req.session.role = dataUser.role;
          return res.redirect("/home");
        } else {
          const error = "invalid username/password";
          return res.redirect(`/signin?error=${error}`);
        }
      } else {
        const error = "invalid username/password";
        return res.redirect(`/signin?error=${error}`);
      }
    } catch (error) {
      res.send(error);
    }
  }

  static async getProfile(req, res) {
    try {
      //  let data =  await Profile.findAll()
      // {
      //     include: 'Users',
      //     attributes: ['email']
      // })
      res.render("profile");
      // console.log(data);
    } catch (error) {
      res.send(error);
    }
  }

  static async userDetail(req, res) {
    try {
      res.render("profile");
    } catch (error) {
      res.send(error);
    }
  }

  static async getEditUser(req, res) {
    try {
      let data = await User.findAll();
      res.render("showFormEdit", { data });
    } catch (error) {
      res.send(error);
    }
  }

  static async postEditUser(req, res) {
    try {
      const { name, phoneNumber } = req.body;
      await User.create({ name, phoneNumber });
      res.redirect("showFormEdit");
    } catch (error) {
      res.send(error);
    }
  }
   
  static async home(req, res) {
    try {
        let userId = req.session.UserId;
        let role = req.session.role;
        let invest = await Investment.findAll({
            where: { UserId: userId },
            include: {
                model: Company,
                include: {
                    model: Category
                }
            }
        })
        let company = await Company.findAll({
            include: {
                model: Category
            }
        })
        res.render('home', { invest, currency, company, role, userId });
    } catch (error) {
        res.send(error);
    }
}

  static async getListCompany(req, res) {
    try {
      const { name } = req.query;
      let data;
      if (name) {
        data = await Company.findAll({
          where: {
            name: {
              [Op.iLike]: `%${name}%`,
            },
          },
        });
      } else {
        data = await Company.findAll();
      }
      res.render("company", { data });
    } catch (error) {
      res.send(error);
    }
  }
    
static async buyStock(req,res){
        try {
            const {id} = req.params
            let company = await Company.findByPk(id)
            let findInvestment = await Investment.findByPk(+id)
            await findInvestment.increment('amount', {by: company.stockPrice})
            res.redirect('/home')
        } catch (error) {
            res.send(error)         
        }
  }

static async sellStock(req,res){
        try {
            const {id} = req.params
            let company = await Company.findByPk(id)
            let findInvestment = await Investment.findByPk(+id)
            await findInvestment.decrement('amount', {by: company.stockPrice})
            res.redirect('/home')
        } catch (error) {
            res.send(error)         
        }
    }
    // static async buyNewStock(req, res) {
    //     try {
    //         const { id } = req.params
    //         const userId = req.session.UserId
    //         let company = await Company.findByPk(id);
    //         let findInvestment = await Investment.findOne({
    //             where: {
    //                 UserId: userId,
    //                 CompanyId: id
    //             }
    //         })
    //         if (findInvestment) {
    //             await findInvestment.increment('amount', { by: company.stockPrice });
    //         } else {
    //             await Investment.create({
    //                 UserId: userId,
    //                 CompanyId: id,
    //                 amount: company.stockPrice,
    //                 caption: `Investment in ${company.name}`
    //             })
    //         }
    //         res.redirect('/home');
    //     } catch (error) {
    //         res.send(error);
    //     }
    // }

    static async buyNewStock(req, res) {
        try {
            const { id } = req.params;
            const userId = req.session.UserId;
            let company = await Company.findByPk(id);
            if (!company) {
                throw new Error("Company not found");
            }
            let name, description;
            switch(id) {
                case '1':
                    name = 'GBC';
                    description = 'Banking Stock';
                    break;
                case '2':
                    name = 'GML';
                    description = 'Mining Stock';
                    break;
                case '3':
                    name = 'ECG';
                    description = 'Consumer Goods Stock';
                    break;
                case '4':
                    name = 'TFI';
                    description = 'Technology Stock';
                    break;
                case '5':
                    name = 'GES';
                    description = 'Renewable Energy Stock';
                    break;
                default:
                    name = 'Unknown';
                    description = 'Unknown Stock';
            }
            let findInvestment = await Investment.findOne({
                where: {
                    UserId: userId,
                    CompanyId: id
                }
            })
            if (findInvestment) {
                await findInvestment.increment('amount', { by: company.stockPrice });
            } else {
                await Investment.create({
                    UserId: userId,
                    CompanyId: id,
                    amount: company.stockPrice,
                    caption: `Investment in ${company.name}`,
                    name: name,
                    description: description,
                    investmentType: 'Stock'
                })
            }
            res.redirect('/home');
        } catch (error) {
            res.send(error.message);
        }
    }
        

  static async deleteCompany(req, res) {
    try {
      const { id } = req.params;
      await Company.destroy({
        where: { id },
      });
      res.redirect("/company");
    } catch (error) {
      res.send(error);
    }
  }
  static async getSignOut(req, res) {
    try {
      req.session.destroy((err) => {
        if (err) {
          res.send(err);
        } else {
          res.redirect("/signin");
        }
      });
    } catch (error) {
      res.send(error);
    }
  }
}

module.exports = Controller;
