import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { showUser, updateUser, changePassword } from "../../redux/index";
import "./UserProfile.css";

const UserProfile = (props) => {
  const [userDetails, UserDetails] = useState({
    phonenumber: null,
    course: null,
    class: null,
    city: null,
    state: null,
    email: null,
    height: "",
    heightunits: "metres",
    weight: "",
    weightunits: "Kg",
    age: "",
    goal : '',
    approach : '',
    activityLevel : '',
    gender: "male",
    newpassword: "",
    oldpassword: "",
  });

  const changeHandler = (event) => {
    const { name, value } = event.target;
    UserDetails((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(showUser(props.user.userid));
  }, [props.user.userid]);

  return (
    <div className="Calculator">
      <h1>Your Profile</h1>
      <div className="calculator-div">
        <label htmlFor="exampleEmail">Username :</label>
        <input
          className="form-input"
          type="text"
          name="username"
          id="userName"
          onChange={changeHandler}
          value={props.user.username}
        />
      </div>
      <div className="calculator-div">
        <label htmlFor="Email">Select your gender:</label>
        <select
          deflaut={props.profile.gender}
          onChange={changeHandler}
          value={userDetails.gender}
          name="gender"
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>

      <div className="calculator-div">
        <label htmlFor="Email">Enter your height:</label>
        <input
          onChange={changeHandler}
          value={userDetails.height}
          placeholder={props.profile.height}
          type="number"
          name="height"
        />
        <select
          value={userDetails.heightunits}
          type="multiple"
          name="heightunits"
          onChange={changeHandler}
        >
          <option value="metres" selected="selected">
            metres
          </option>
          <option value="inches">inches</option>
        </select>
      </div>
      <div className="input-box">
        <label htmlFor="Email">Enter your weight:</label>
        <input
          onChange={changeHandler}
          value={userDetails.weight}
          placeholder={props.profile.weight}
          type="number"
          name="weight"
        />
        <select
          onChange={changeHandler}
          value={userDetails.weightunits}
          name="weightunits"
        >
          <option value="kg">Kg</option>
          <option value="pound">Pound</option>
        </select>
      </div>

      <div className="input-box">
        <label htmlFor="exampleEmail">Enter Your Age</label>
        <input
          className="form-input"
          type="number"
          name="age"
          id="userName"
          onChange={changeHandler}
          value={userDetails.age}
          placeholder={props.profile.age}
        />
      </div>
      <select name="activityLevel" value={userDetails.activityLevel} onChange={changeHandler}>
        <option value="sedentary"><strong>Sedentary</strong> - little to no exercise + work a desk job</option>
        <option value="light"><strong>Light </strong>- light exercise 1-3 days/week</option>
        <option value="moderate"><strong>Moderate </strong>- moderate exercise 3-5 days/week</option>
        <option value="high"><strong>High</strong> - heavy exercise 6-7 days/week</option>
        <option value="extreme"><strong>Extreme</strong> - very heavy exercise, hard labor job, training 2x/day</option>
      </select>
      <select name="approach" value={userDetails.approach} onChange={changeHandler}>
        <option value="slow"><strong>Slow</strong> - very slow weightloss/gain</option>
        <option value="normal"><strong>Normal</strong> - normal weightloss/gain, this is the default and recommended value</option>
        <option value="aggressive"><strong>Agressive</strong> - agressive weightloss/gain</option>
        <option value="very aggressive"><strong>Very Agressive</strong> - very agressive weightloss/gain, only recommended for professional athletes</option>
      </select>
      <select name="goal" value={userDetails.goal} onChange={changeHandler}>
        <option value="reduction"><strong>Reduction</strong> - weightloss</option>
        <option value="maintain"><strong>Maintain</strong> - maintain current weight</option>
        <option value="gain"><strong>Gain</strong>- gain weight</option>
      </select>

      <div className="input-box">
        <label htmlFor="exampleState">old password</label>
        <input
          className="form-input"
          type="text"
          name="oldpassword"
          onChange={changeHandler}
        />
      </div>
      <div className="input-box">
        <label htmlFor="exampleState">new password</label>
        <input
          className="form-input"
          type="text"
          name="newpassword"
          onChange={changeHandler}
        />
      </div>
      <h6>{props.passmsg}</h6>
      <button
				className="update-profile-button"
				onClick={() =>
					props.updateUser(
                        userDetails.activityLevel,
                        userDetails.goal,
                        userDetails.approach,
                        userDetails.gender,
                        userDetails.age,
                        userDetails.height,
                        userDetails.heightunits,
                        userDetails.weight,
                        userDetails.weightunits,
						props.profile._id
					)}
			>
				Update Profile
			</button>
      <button
        className="update-profile-button"
        onClick={() =>
          props.changePassword(
            props.user.username,
            userDetails.oldpassword,
            userDetails.newpassword
          )
        }
      >
        change password
      </button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    passmsg: state.user.passmsg,
    user: state.user.userDetails,
    profile: state.user.profile,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateUser: function (
        activityLevel,
        goal,
        approach,
        gender,
        age,
        height,
        heightunits,
        weight,
        weightunits,
        profileid
    ) {
      dispatch(
        updateUser(
            activityLevel,
            goal,
            approach,
            gender,
            age,
            height,
            heightunits,
            weight,
            weightunits,
            profileid,
        )
      );
    },
    changePassword: function (username, oldpassword, newpassword) {
      dispatch(changePassword(username, oldpassword, newpassword));
    }
};
  };
export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);