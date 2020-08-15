let express = require('express');
let router = express.Router();
const bodyParser = require('body-parser');
let userModel = require('../models/usermodel');
let userprofile = require('../models/userprofile');
let Auth = require('../config/Auth');
const bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');
const request = require('request');

router.use(express.json());

router.use(bodyParser.urlencoded({ extended: true }));

router.post('/login', function(req, res) {
	console.log(req.body);
	let username = req.body.username;
	userModel
		.find({ username: username })
		.exec()
		.then((user) => {
			if (user.length < 1) {
				res.status(404).json({
					message: 'Auth Failed'
				});
			} else {
				bcrypt.compare(req.body.password, user[0].password, function(err, result) {
					if (err) {
						res.json({
							message: 'Auth Failed'
						});
					}
					if (result) {
						let token = jwt.sign(
							{
								username: user[0].username,
								userid: user[0]._id,
								type: 'Student'
							},
							'secret',
							{
								expiresIn: '8h'
							}
						);
						res.status(200).json({
							message: 'User Found',
							token: token
						});
					} else {
						res.json({
							message: 'Auth Failed'
						});
					}
				});
			}
		})
		.catch((err) => {
			res.json({
				error: err
			});
		});
});

router.post('/signup', function(req, res) {

	let username = req.body.username;
	let email = req.body.email;
	let password = req.body.password;
	let confirmPassword = req.body.confirmpassword;

	if (password !== confirmPassword) {
		res.json({
			message: 'Password Not Matched!'
		});
	} else {
		bcrypt.hash(password, 10, function(err, hash) {
			if (err) {
				return res.json({
					message: 'Something Wrong, Try Later!',
					error: err
				});
			} else {
				let userDetails = new userModel({
					username: username,
					email: email,
					password: hash
				});

				userDetails
					.save()
					.then((doc) => {
						const profile = userprofile({
							user: doc._id,
							username: username
						});

						profile.save();

						res.status(201).json({
							message: 'User Registered Successfully',
							results: doc
						});
					})
					.catch((err) => {
						res.json(err);
					});
			}
		});
	}
});


router.post('/changepassword',Auth, async (req, res) => {

	try{
		let username = req.body.username;
		let userDetails;
		if(req.body.type==='student'){
			userDetails=await userModel.find({ username: username })
		}else(
			userDetails=await adminModel.find({ username: username })
		)
	

					bcrypt.compare(req.body.oldpassword, userDetails[0].password, function(err, result) {
						if (err) {
							console.log('wrong');
							res.json('wrong password');
						}
						if (result) {
							console.log(result);
							bcrypt.hash(req.body.newpassword, 10, function(err, hash) {
						
								userDetails[0].password=hash;
								console.log(userDetails[0].password,hash);
								userDetails[0].save();
								
							});
							res.json('sucess');
						} 
					});
				
					
	}catch{

	}
	
});
router.get('/userprofile/:userid', Auth, async (req, res) => {
	try {
		let userid = req.params.userid;

		const profileuser = await userprofile.findOne({ user: userid });

		res.json(profileuser);
	} catch (err) {
		console.error(err.message);
		if (err.kind == 'ObjectId') res.status(400).json({ msg: 'profile not found' });

		res.status(500).send('Server Error');
	}
});
router.patch('/updateprofile', Auth, async (req, res) => {
	try {
		let activitylevel= req.body.activityLevel;
		let Email = req.body.email;
		let goal = req.body.goal;
		let approach = req.body.approach;
		let weight = req.body.weight;
		let heightunits=req.body.heightunits;
		let weightunits=req.body.weightunits;
		let height=req.body.height;
		 let age= req.body.age;
		 let gender=req.body.gender;
		
		console.log(req.body);
		
		
		await userprofile.findById(req.body.profileid, function(err, data) {
			(data.activityLevel = activitylevel ? activitylevel : data.activityLevel),
				(data.goal = goal ? goal : data.goal),
				(data.approach = approach ? approach : data.approach),
				(data.email = Email ? Email : data.email),
				(data.weight = weight ? weight : data.weight),
				(data.height = height ? height : data.height),
				(data.weightunits = weightunits ? weightunits : data.weightunits),
				(data.heightunits = heightunits ? heightunits : data.heightunits);
				(data.age = age ? age : data.age);
				(data.gender = gender ? gender : data.gender);
			data.save();
			res.json(data);
		});
	} catch (err) {
		console.error(err.message);
		if (err.kind == 'ObjectId') res.status(400).json({ msg: 'profile not found' });

		res.status(500).send('Server Error');
	}
});


router.get('/getrecipe/:minCalories/:maxCalories/:number', Auth, async (req, res) => {
	try {
		console.log(req.params.number);
		request(
			{ url: '***'+req.params.minCalories+'&maxCalories='+req.params.maxCalories+'&number='+req.params.number+''},
			(error, response, body) => {
			  if (error || response.statusCode !== 200) {
				return res.status(500).json({ type: 'error', message: err.message });
			  }
		
			  res.json(JSON.parse(body));
			}
		  );
	} catch (err) {
		console.error(err.message);
		if (err.kind == 'ObjectId') res.status(400).json({ msg: 'profile not found' });

		res.status(500).send('Server Error');
	}
});
// router.post('/deletepaper', Auth, async (req, res) => {
// 	try {
// 		 await Exammodel.findByIdAndDelete(req.body.examid) // This method is the nice method for deleting
// 		.catch(err => res.status(400).send(err.message));
		
// 		res.json(req.body.examid);
// 	}
//      catch (err) {
// 		console.error(err.message);
// 		if (err.kind == 'ObjectId') res.status(400).json({ msg: 'profile not found' });

// 		res.status(500).send('Server Error');
// 	}
// });
// router.post('/deletesec', Auth, async (req, res) => {
// 	try {
// 		const exam = await Exammodel.findById(req.body.examid);
// 		const section=exam.sec.id(req.body.secid)
// 		section.remove();
// 		exam.save();


// 		res.json(exam.sec);
// 	} catch (err) {
// 		console.error(err.message);
// 		if (err.kind == 'ObjectId') res.status(400).json({ msg: 'profile not found' });

// 		res.status(500).send('Server Error');
// 	}
// });
// router.post('/deleteque', Auth, async (req, res) => {
// 	try {
// 		const exam = await Exammodel.findById(req.body.examid);
// 		const section=exam.sec.id(req.body.secid);
// 		const question=section.question.id(req.body.queid);
// 		question.remove();
// 		exam.save();


// 		res.json(exam.sec);
// 	} catch (err) {
// 		console.error(err.message);
// 		if (err.kind == 'ObjectId') res.status(400).json({ msg: 'profile not found' });

// 		res.status(500).send('Server Error');
// 	}
// });
// router.patch('/editsec', Auth, async (req, res) => {
// 	try {
		
// 		let secname = req.body.secname;
// 		let typeofques = req.body.typeofques;
// 		let positive = req.body.positive;
// 		let negative = req.body.negative;
// 		let subject = req.body.subject;

	
// 		await ExamModel.findById(req.body.examid, function(err, data) {
// 			data.sec.id(req.body.secid)
// 			(data.phonenumber = Phonenumber ? Phonenumber : data.phonenumber),
// 				(data.city = City ? City : data.city),
// 				(data.state = State ? State : data.state),
// 				(data.email = Email ? Email : data.email);
// 				(data.avatar = Avatar ? Avatar : data.avatar);
// 			data.save();
// 			res.json(data);
// 		});
// 	} catch (err) {
// 		console.error(err.message);
// 		if (err.kind == 'ObjectId') res.status(400).json({ msg: 'profile not found' });

// 		res.status(500).send('Server Error');
// 	}
// });

// router.patch('/finalstep', Auth, async (req, res) => {
// 	try {
		
// 		let Examdate = req.body.date;
// 		let Duration = req.body.duration*60*60;
		
// 		let Host = 1;

// 		let exam=await Exammodel.findById(req.body.id, function(err, data) {
	
// 			(data.examdate = Examdate ? Examdate : data.examdate),
// 				(data.duration = Duration ? Duration : data.duration),
	
// 				(data.host = Host ? Host : data.host);
// 			data.save();
// 			res.json(data._id);
// 		});
// 	} catch (err) {
// 		console.error(err.message);
// 		if (err.kind == 'ObjectId') res.status(400).json({ msg: 'profile not found' });

// 		res.status(500).send('Server Error');
// 	}
// });

// router.get('/attemptexam/:id/:userid/:username', Auth, async (req, res) => {
// 	try {
// 		const exam = await Exammodel.findById(req.params.id);
// 		const examid = req.params.id;
// 		const userid = req.params.userid;
// 		const username = req.params.username;

// 		const answersheet = new ResponseModel({
// 			examid: examid,
// 			user: userid,
// 			examname:exam.examname,
// 			username:username
// 		});
// 		answersheet.save();
// 		res.json(exam);
// 	} catch (err) {
// 		console.error(err.message);
// 		if (err.kind == 'ObjectId') res.status(400).json({ msg: 'No exam found' });

// 		res.status(500).send('Server Error');
// 	}
// });

// router.put('/attemptquestion', Auth, async (req, res) => {
// 	try {

// 		let examid = req.body.examid;
// 		let userid = req.body.userid;
// 		let _id = req.body.questionid;
// 		let secid = req.body.secid;
// 		let subject = req.body.subject;
// 		let mark = req.body.mark;
	
// 		let paperdetail = {
// 			_id,
// 			subject,
// 			secid,
// 			mark
// 		};

// 		let answersheets = await ResponseModel.findOne({examid:examid,user:userid});
	
		
// 			if(answersheets.response.id(_id)){
		
// 				answersheets.response.id(_id).mark=mark;
// 				answersheets.save();	
// 			}else{
	
// 				answersheets.response.unshift(paperdetail);
// 				answersheets.save();
// 			}
// 			res.json("marked");

// 	} catch (err) {
// 		console.error(err.message);
// 		if (err.kind == 'ObjectId') res.status(400).json({ msg: ' noQuestiont found' });

// 		res.status(500).send('Server Error');
// 	}
// });

// router.get('/examresult/:examid',Auth,async(req,res)=>{
// 	try{

// 	let examid=req.params.body;

// 	let answersheets = await ResponseModel.find({ examid: examid }).sort({ total: -1 });

// 	res.json(answersheets);

// 	}catch{


// 	}


// });

// router.get('/hostedexam/:id',Auth,async(req,res)=>{
// 	try{

// 	let examid = req.params.body;
// 	const exams = await Exammodel.find(
// 		{ admin: req.params.id, host: '1' },
// 		{ examname: 1, description: 1, course: 1, class: 1 ,_id: 1}
// 	);
// 	res.json(exams);
// 	res.json(answersheets);

// 	}catch{
		
// 	}
// });

// router.get('/examranklist/:examid',Auth,async(req,res)=>{
// 	try{
// 	let total=0;
// 	let rank=0;
// 	let examid=req.params.examid;
// 	let answersheets = await ResponseModel.find({examid:examid}).sort({total:-1});
// 	res.json({
// 		answersheet
// 	});

// 	}catch{

// 	}


// });

// router.get('/ranklist/:examid',Auth,async(req,res)=>{
// 	try{

// 	let examid=req.params.examid;

// 	let answersheets = await ResponseModel.find({examid:examid}).sort({total:-1});
// 	res.json(answersheets);

// 	}catch(err){
// 		console.log(err);
// 	}


// });

// router.get('/dashboard/:userid',Auth,async(req,res)=>{
// 	try{
// 		let mathcount=0;
// 		let chemcount=0;
// 		let phycount=0;
// 		let totalmath=0;
// 		let totalchem=0;
// 		let totalphy=0;
// 	let userid=req.params.userid;

// 	let answersheets = await ResponseModel.find({user:userid}).sort({total:-1}).then((answer) => {

// 		answer.forEach((answers) => {
// 		  answers.response.forEach((response)=>{
// 			  if(response.subject==='math'  && response.marked===true){
// 				  mathcount++;
// 			  }
// 			  if(response.subject==='math'){
// 				  totalmath++;
// 			  }
// 			  if(response.subject==='chem' && response.marked===true){
// 				chemcount++;
// 				}
// 				if(response.subject==='chem'){
// 					totalchem++;
// 				}
// 				if(response.subject==='phy'&& response.marked===true){
// 					phycount++;
// 				}
// 				if(response.subject==='phy'){
// 					totalphy++;
// 				}
			
// 		  });
// 		});
// 	  });
	
// 	res.json({
// 		mathcount,
// 		totalmath,
// 		chemcount,
// 		totalchem,
// 		phycount,
// 		totalphy
// 	});
// 	}catch(error){
// 	console.log(error);
// 	}


// });

// router.get('/analysisexam/:examid/:userid',Auth,async(req,res)=>{
// 	try{
// 		let userid=req.params.userid;
// 		let examid=req.params.examid;
		
// 		let total=0;
// 		let mathrank=1;
// 		let chemrank=1;
// 		let phyrank=1;
	
// 		let totalrank=1;
// 		let totalhigh=1;
// 		let mathavg=0;
// 		let mathhigh=0;
// 		let mathuser=0;
	
// 		let chemavg=0;
// 		let chemhigh=0;
// 		let chemuser=0;
	
// 		let phyavg=0;
// 		let phyhigh=0;
// 		let phyuser=0;
	
// 		let totalavg;
// 		let examsheet=await Exammodel.find({examid:examid});
	
// 			let usersheet=await ResponseModel.find({examid:examid,user:userid});
			
		
	
// 			let answersheets = await ResponseModel.find({examid:examid}).sort({total:-1}).then((answer) => {
	
// 				answer.forEach((answers) => {
// 					total++;
	
// 					if(answers.physics>phyhigh){
// 						phyhigh=answers.physics
// 					}
// 					if(answers.total>totalhigh){
// 						totalhigh=answers.total
// 					}
// 					if(answers.math>mathhigh){
// 						mathhigh=answers.math
// 					}
// 					if(answers.chemistry>chemhigh){
// 						chemhigh=answers.chemistry
// 					}
// 					if(answers.user==userid){
// 						if(answers.physics>phyhigh){
// 							phyrank++;
// 						}
// 						if(answers.math>mathhigh){
// 							mathrank++;
// 						}
// 						if(answers.chemistry>chemhigh){
// 							chemrank++;
// 						}
// 					}
// 					if(answers.user==userid){
				
// 						mathuser=answers.math;
// 						chemuser=answers.chemistry;
// 						phyuser=answers.physics;
// 					}
// 					totalavg=answers.total+totalavg;
			
// 					mathavg=answers.math+mathavg;
			
// 					chemavg=answers.chemistry+chemavg;
			
// 					phyavg=answers.physics+phyavg;
// 				});
// 			  });
// 			//   totalavg=totalavg/total;
			
// 			  mathavg=mathavg/total;
// 			  chemavg=chemavg/total;
// 			  phyavg=phyavg/total;
	  
// 		res.json({total,mathrank,chemrank,phyrank,totalhigh,totalrank,mathavg,mathhigh,mathuser,chemavg,chemhigh,chemuser,phyavg,phyhigh,phyuser,examsheet,usersheet});
// 	}catch(err){
// 	console.log(err);
// 	}
	
// });

// router.get('/attemptedexam/:userid', Auth, async (req, res) => {
// 	try {

// 		let userid = req.params.userid;
// 		let answersheets = await ResponseModel.find({user:userid},{total:1,examname:1,examid:1});
			
// 		res.json(answersheets);

// 	} catch (err) {
// 		console.error(err.message);
// 		if (err.kind == 'ObjectId') res.status(400).json({ msg: ' noQuestiont found' });

// 		res.status(500).send('Server Error');
// 	}
// });

// router.get('/calculation/:examid/:userid',Auth,async(req,res)=>{

// 	try{
	
// 	let userid=req.params.userid;
// 	let examid=req.params.examid;
	
// 		let examsheet = await Exammodel.findById(req.params.examid);
// 		console.log(examsheet);
// 		examsheet.attemptedstudent.push(userid);

	

// 	await ResponseModel.find({examid:examid,user:userid}).then((userSheet) => {

// 		userSheet[0].status='Submitted';

	

// 		examsheet.sec.forEach((sec)=>{

// 			sec.question.forEach((allQue)=>{

// 				userSheet[0].response.forEach((answered)=>{
					
// 					quesId=allQue._id;
	
// 					if(quesId.equals(answered._id)){
									
									
// 									if(sec.subject==='math'){
				
// 									if (JSON.stringify(allQue.correct) === JSON.stringify(answered.mark)) {
							
// 									userSheet[0].correcttags.push(...allQue.tag);
// 									answered.marked = 1;
// 									answered.score = sec.positive;
// 									userSheet[0].math=answered.score+userSheet[0].math;
// 									userSheet[0].total = userSheet[0].total + sec.positive;
							
// 									} else {
							
// 									userSheet[0].wrongtags.push(...allQue.tag);
// 									answered.marked = 0;
// 									answered.score = -1 * sec.negative;
// 									userSheet[0].math=answered.score+userSheet[0].math;
// 									userSheet[0].total = userSheet[0].total - sec.negative;
// 									}
// 									}
// 									if(sec.subject==='chem'){
// 									if (JSON.stringify(allQue.correct) === JSON.stringify(answered.mark)) {
// 									userSheet[0].correcttags.push(...allQue.tag);
// 									answered.marked = 1;
// 									answered.score = sec.positive;
// 									userSheet[0].chemistry=answered.score+userSheet[0].chemistry;
// 									userSheet[0].total = userSheet[0].total + sec.positive;
// 									} else {
// 									userSheet[0].wrongtags.push(...allQue.tag);
// 									answered.marked = 0;
// 									answered.score = -1 * sec.negative;
// 									userSheet[0].chemistry=answered.score+userSheet[0].chemistry;
// 									userSheet[0].total = userSheet[0].total - sec.negative;
// 									}
// 									}
// 									if(sec.subject==='phy'){
// 									if (JSON.stringify(allQue.correct) === JSON.stringify(answered.mark)) {
							
// 									userSheet[0].correcttags.push(...allQue.tag);
// 									answered.marked = 1;
// 									answered.score = sec.positive;
// 									userSheet[0].physics=answered.score+userSheet[0].physics;
// 									userSheet[0].total = userSheet[0].total + sec.positive;
// 									} else {
							
// 									userSheet[0].wrongtags.push(...allQue.tag);
							
// 									answered.marked = 0;
// 									answered.score = -1 * sec.negative;
// 									userSheet[0].physics=answered.score+userSheet[0].physics;
// 									userSheet[0].total = userSheet[0].total - sec.negative;
// 									}
// 									}
	
									
								
// 					}
// 					else{
				
// 							userSheet[0].unattempttags.push(...allQue.tag);
						
						
// 					}
			
// 				});

// 				});


// 				});

// 				userSheet[0].save();
// 				});


	

// 	examsheet.save();

// 	res.json('hello');
	
// }catch(err){
// console.log(err);
// }

// });


// router.post('/addpost', Auth, async (req, res) => {
// 	try {
	
// 		const userid = req.body.userid;
// 		const username = req.body.username;
// 		const query = req.body.query;
// 		const subject = req.body.subject;
// 		const avatar = req.body.avatar;

// 		const newpost =  new postModel({
// 			avatar:avatar,
// 				id: userid,
// 				query:query,
// 				subject:subject,
// 				username:username
// 		});
// 		newpost.save();
// 		res.json(newpost);
// 	} catch (err) {
// 		console.error(err.message);
// 		if (err.kind == 'ObjectId') res.status(400).json({ msg: 'Try later' });

// 		res.status(500).send('Server Error');
// 	}
// });

// router.get('/allpost', Auth, async (req, res) => {
// 	try {
		
// 		const allpost = await postModel.find().sort({postdate:-1});
		
// 		res.json(allpost);
// 	} catch (err) {
// 		console.error(err.message);
// 		if (err.kind == 'ObjectId') res.status(400).json({ msg: 'No exam found' });

// 		res.status(500).send('Server Error');
// 	}
// });

// router.post('/addcomment', Auth, async (req, res) => {
// 	try {
	
// 		let username = req.body.username;
// 		let comment = req.body.comment;
// 		let postid = req.body.postid;
// 		let upvote = req.body.upvote;
// 		let avatar=req.body.avatar;
// 		let commentdetail;
// 		let postupvote=[];
// 		const post = await  postModel.findById(postid);


// 			if(upvote===0){
// 				commentdetail={
// 					avatar:avatar,
// 					username:username,
// 					userComment:comment
// 				}
// 				post.comment.unshift(commentdetail);
// 				post.save();
// 				res.json({postid,commentdetail});
// 			}else{
// 				 post.upvote = [...post.upvote ,username];
// 				post.save();
// 				res.json({postid,postupvote:post.upvote});
// 				console.log(post.upvote);
// 			}

// 	} catch (err) {
// 		console.error(err.message);
// 		if (err.kind == 'ObjectId') res.status(400).json({ msg: 'No exam found' });

// 		res.status(500).send('Server Error');
// 	}
// });

module.exports = router;
