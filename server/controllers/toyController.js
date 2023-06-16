const Toy = require("../models/Toy");
const mongoose = require("mongoose");

/**
 * GET /
 * Homepage
 */
exports.homepage = async (req, res) => {

    const messages = await req.consumeFlash('info');
    const locals = {
      title: 'NodeJs',
      description: 'Free NodeJs User Management System'
    }

    let perPage = 12;
    let page = req.query.page || 1;

    try {
      const toys = await Toy.aggregate([ { $sort: { createdAt: -1 } } ])
        .skip(perPage * page - perPage)
        .limit(perPage)
        .exec(); 
      const count = await Toy.count();

      res.render('index', {
        locals,
        toys,
        current: page,
        pages: Math.ceil(count / perPage),
        messages
      });

    } catch (error) {
      console.log(error);
    }
}
// exports.homepage = async (req, res) => {
//     const messages = await req.consumeFlash('info');
//     const locals = {
//       title: 'NodeJs',
//       description: 'Free NodeJs User Management System'
//     }

//     try {
//       const toys = await Toy.find({}).limit(22);
//       res.render('index', { locals, messages, toys } );
//     } catch (error) {
//       console.log(error);
//     }
// }

/**
 * GET /
 * About
 */
exports.about = async (req, res) => {
    const locals = {
      title: 'About',
      description: 'Free NodeJs User Management System'
    }

    try {
      res.render('about', locals );
    } catch (error) {
      console.log(error);
    }
}






/**
 * GET /
 * New Toy Form
 */
exports.addToy = async (req, res) => {
  const locals = {
    title: "Add New Toy - NodeJs",
    description: "Free NodeJs User Management System",
  };

  res.render("customer/add", locals);
};

/**
 * POST /
 * Create New Toy
 */
exports.postToy = async (req, res) => {
  console.log(req.body);

  const newCustomer = new Toy({
    name: req.body.name,
    productionDate: req.body.productionDate,
    price: req.body.price,
    details: req.body.details,
  });

  try {
    await Toy.create(newCustomer);
    await req.flash("info", "New toy has been added.");

    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
};


/**
 * GET /
 * Toy Data 
*/
exports.view = async (req, res) => {

  try {
    const customer = await Toy.findOne({ _id: req.params.id })

    const locals = {
      title: "View Toy Data",
      description: "Free NodeJs User Management System",
    };

    res.render('customer/view', {
      locals,
      customer
    })

  } catch (error) {
    console.log(error);
  }

}



/**
 * GET /
 * Edit Toy Data 
*/
exports.edit = async (req, res) => {

  try {
    const customer = await Toy.findOne({ _id: req.params.id })

    const locals = {
      title: "Edit Toy Data",
      description: "Free NodeJs User Management System",
    };

    res.render('customer/edit', {
      locals,
      customer
    })

  } catch (error) {
    console.log(error);
  }

}




/**
 * GET /
 * Update Toy Data 
*/
exports.editPost = async (req, res) => {
  try {
    await Toy.findByIdAndUpdate(req.params.id,{
      name: req.body.name,
      productionDate: req.body.productionDate,
      price: req.body.price,
      details: req.body.details,
      updatedAt: Date.now()
    });
    await res.redirect(`/edit/${req.params.id}`);
    
    console.log('redirected');
  } catch (error) {
    console.log(error);
  }
}


/**
 * Delete /
 * Delete Toy Data 
*/
exports.deleteToy = async (req, res) => {
  try {
    await Toy.deleteOne({ _id: req.params.id });
    res.redirect("/")
  } catch (error) {
    console.log(error);
  }
}


/**
 * Get /
 * Search Toy Data 
*/
exports.searchToys = async (req, res) => {

  const locals = {
    title: "Search Toy Data",
    description: "Free NodeJs User Management System",
  };

  try {
    let searchTerm = req.body.searchTerm;
    const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");

    const toys = await Toy.find({
      $or: [
        { name: { $regex: new RegExp(searchNoSpecialChar, "i") }},
      ]
    });

    res.render("search", {
      toys,
      locals
    })
    
  } catch (error) {
    console.log(error);
  }

}