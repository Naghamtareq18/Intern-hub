import { Button, Col, Container, Form, Row } from "react-bootstrap";
import "./EditeProfilePage.css";
import ".././vars.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Avatar from "react-avatar-edit";
import AvatarPicture from "../../assets/images/avatar.png";
import { Dialog } from "primereact/dialog";
// import { Avatar } from "@mantine/core";
// import { httpRequest } from "../../../core/utils/httpRequest.js";
// import API_CONFIG from "../../../core/utils/apiConfig.js";

// you can recomented your import above dependent your project
import { httpRequest } from "../../core/utils/httpRequest.js";
import API_CONFIG from "../../core/utils/apiConfig.js";

export const EditeProfilePage = () => {
	// const token = JSON.parse(localStorage.getItem("userInfo")).data.token;
	const [userName, setUserName] = useState("");
	const [emailValue, setEmail] = useState("");

	const [birthdate, setBirthdate] = useState("");
	const [bio, setBio] = useState("");
	const [phoneNumber, setPhoneNumber] = useState();
	const [address, setAddress] = useState({
		city: "",
		country: "",
		address: "",
	});
	const [gender, setGender] = useState("");
	// const [status, setStatus] = useState("");
	const [exprienceYears, setExprienceYears] = useState("");
	const [skills, setSkills] = useState("");
	const [allSkills, setAllSkills] = useState([]);
	const [interested, setInterested] = useState("");
	const [allInterested, setAllInterested] = useState([]);
	const [cv, setCV] = useState("");

	const handleCVChange = (e) => {
		const file = e.target.files[0];
		setCV(file);
	};
	// profile ficture edit
	const [imageCrop, setImageCrop] = useState(false);
	const [profilePicture, setProfilePicture] = useState(AvatarPicture);
	const [pview, setPview] = useState(false);

	// image crop
	const onClose = () => {
		setPview(null);
	};
	const onCrop = (view) => {
		setPview(view);
	};
	const saveCropImage = () => {
		setProfilePicture(pview);
		setImageCrop(false);
	};

	const generateRandomId = () => {
		return Math.floor(Math.random() * 1000000);
	};
	const onAddSkillsHandler = () => {
		if (skills) {
			setAllSkills([...allSkills, { title: skills, id: generateRandomId() }]),
				setSkills("");
		} else {
			return;
		}
	};
	const deleteSkillHandler = (skillDelete) => {
		let data = allSkills.filter((single) => single.id !== skillDelete.id);
		setAllSkills(data);
	};
	const onAddInterestHandler = () => {
		if (interested) {
			{
				setAllInterested([
					...allInterested,
					{ title: interested, id: generateRandomId() },
				]),
					setInterested("");
			}
		} else {
			return;
		}
	};
	const deleteInterestedHandler = (interestedDelete) => {
		let data = allInterested.filter(
			(single) => single.id !== interestedDelete.id
		);
		setAllInterested(data);
	};
	// PUT requist
	const onSubmitHandler = (e) => {
		e.preventDefault();

		let userData = JSON.stringify({
			profilePicture,
			address,
			userName,
			phoneNumber,
			exprienceYears,
			allSkills,
			gender,
			// status,
			cv,
			birthdate,
			bio,
			allInterested,
		});

		httpRequest(API_CONFIG.endpoints.user.updateUser, "PUT", userData, {
			Authorization:
				"internHub__eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJVc2VyN2FkNjc1NTUtZTQwMi00NTIyLWFjMjQtNzEwMTBiNTA3Mzk5Iiwicm9sZSI6InVzZXIiLCJpYXQiOjE3MTMzNTIyNDQsImV4cCI6MTcxMzQzODY0NH0.qZLOyanF7NNah8M3XY_yfZ-_1RSs0AtOjfoYuIKWUaY",
		}).then((result) => {
			console.log(result);
		});
	};
	// get user data
	useEffect(() => {
		httpRequest(
			API_CONFIG.endpoints.user.fetchUser,
			"GET",
			{},
			{
				Authorization:
					"internHub__eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJVc2VyN2FkNjc1NTUtZTQwMi00NTIyLWFjMjQtNzEwMTBiNTA3Mzk5Iiwicm9sZSI6InVzZXIiLCJpYXQiOjE3MTMzNTIyNDQsImV4cCI6MTcxMzQzODY0NH0.qZLOyanF7NNah8M3XY_yfZ-_1RSs0AtOjfoYuIKWUaY",
			}
		).then((result) => {
			const userData = result.data.data;
			console.log(userData);
			setProfilePicture(userData.profileImage || "");
			setEmail(userData.email);
			setUserName(userData.userName || "");
			const backendDate = userData.birthdate
				? userData.birthdate.split("T")[0]
				: "";
			setBirthdate(backendDate || "");
			setBio(userData.bio || "");
			setPhoneNumber(userData.phone || "");
			setAddress({
				city: userData.address.city || "",
				country: userData.address.country || "",
				address: userData.address.address || "",
				// country:userData.address.country || "",
			});
			setGender(userData.gender || "");
			setExprienceYears(userData.experienceYears || "");
			setSkills(userData.skills || "");
			setAllInterested(userData.fieldOfInterest || "");
			setCV(userData.cv || "");
		});
	}, []);

	return (
		<div className="edite-profile-data font-color">
			<Container>
				<Row className="bg-page-color">
					<div className="header">
						<h1 className="profile-header">UPDATE PROFILE</h1>
					</div>
					<Form onSubmit={onSubmitHandler}>
						{/* image */}

						<div className="d-flex justify-content-center align-items-center">
							<div className="text-center p-4">
								<div className="d-flex flex-column justify-content-center align-items-center">
									<img
										className="profile-img"
										src={profilePicture}
										alt="profile picture"
										onClick={() => setImageCrop(true)}
									/>
									<Dialog
										visible={imageCrop}
										header={() => {
											<p
												htmlFor=""
												className="text-2xl font-seibold textColor"
											></p>;
										}}
										onHide={() => setImageCrop(false)}
									>
										<div className="crop">
											<Avatar
												width={250}
												height={250}
												onCrop={onCrop}
												onClose={onClose}
											/>
											<div className="d-flex justify-content-center align-items-center">
												<Button
													onClick={saveCropImage}
													className="btn btn-primary m-3"
												>
													SAVE
												</Button>
											</div>
										</div>
									</Dialog>
								</div>
							</div>
						</div>
						{/* user img */}
						<Col>
							<Form.Group as={Row} className="mb-3">
								<Col sm="2">
									<Form.Label>Profile Picture</Form.Label>
								</Col>
								<Col sm="10">
									<Form.Control value={profilePicture} disabled readOnly />
								</Col>
							</Form.Group>
						</Col>
						{/* user name */}
						<Col>
							<Form.Group as={Row} className="mb-3">
								<Col sm="2">
									<Form.Label>User Name</Form.Label>
								</Col>
								<Col sm="10">
									<Form.Control
										value={userName}
										onChange={(e) => setUserName(e.target.value)}
									/>
								</Col>
							</Form.Group>
						</Col>
						{/* Bio */}
						<Col>
							<Form.Group as={Row} className="mb-3">
								<Col sm="2">
									<Form.Label>Bio</Form.Label>
								</Col>
								<Col sm="10">
									<Form.Control
										value={bio}
										onChange={(e) => setBio(e.target.value)}
									/>
								</Col>
							</Form.Group>
						</Col>
						{/* email */}
						<Col>
							<Form.Group as={Row} className="mb-3">
								<Col sm="2">
									<Form.Label>Email</Form.Label>
								</Col>
								<Col sm="10">
									<Form.Control value={emailValue} disabled />
								</Col>
							</Form.Group>
						</Col>
						{/* gender */}
						<Col>
							<Form.Group as={Row} className="mb-3">
								<Col sm="2">
									<Form.Label>Gender</Form.Label>
								</Col>
								<Col sm="10">
									<Form.Select
										aria-label="Default select example"
										sm="6"
										value={gender}
										onChange={(e) => setGender(e.target.value)}
									>
										<option value="1">select gender</option>
										<option value="male">male</option>
										<option value="female">female</option>
									</Form.Select>
								</Col>
							</Form.Group>
						</Col>
						{/* phone */}
						<Col>
							<Form.Group as={Row} className="mb-3">
								<Col sm="2">
									<Form.Label>Phon Number</Form.Label>
								</Col>
								<Col sm="10">
									<Form.Control
										type="tell"
										pattern="[0-9]{11}"
										value={phoneNumber}
										onChange={(e) => setPhoneNumber(e.target.value)}
									/>
								</Col>
							</Form.Group>
						</Col>
						{/* birthdate */}
						<Col>
							<Form.Group as={Row} className="mb-3">
								<Col sm="2">
									<Form.Label>Birthdate</Form.Label>
								</Col>
								<Col sm="10">
									<Form.Control
										type="date"
										value={birthdate}
										onChange={(e) => setBirthdate(e.target.value)}
									/>
								</Col>
							</Form.Group>
						</Col>
						{/* city */}
						<Col>
							<Form.Group as={Row} className="mb-3">
								<Col sm="2">
									<Form.Label>City</Form.Label>
								</Col>
								<Col sm="10">
									<Form.Control
										value={address.city}
										onChange={(e) =>
											setAddress({
												city: e.target.value,
												country: address.country,
												address: address.address,
											})
										}
									/>
								</Col>
							</Form.Group>
						</Col>
						{/* country */}
						<Col>
							<Form.Group as={Row} className="mb-3">
								<Col sm="2">
									<Form.Label>Country</Form.Label>
								</Col>
								<Col sm="10">
									<Form.Control
										value={address.country}
										onChange={(e) =>
											setAddress({
												city: address.city,
												country: e.target.value,
												address: address.address,
											})
										}
										// onChange={(e) => setCountry(e.target.value)}
									/>
								</Col>
							</Form.Group>
						</Col>
						{/* address */}
						<Col>
							<Form.Group as={Row} className="mb-3">
								<Col sm="2">
									<Form.Label>Address</Form.Label>
								</Col>
								<Col sm="10">
									<Form.Control
										className="address"
										value={address.address}
										onChange={(e) =>
											setAddress({
												city: address.city,
												country: address.country,
												address: e.target.value,
											})
										}
									/>
								</Col>
							</Form.Group>
						</Col>
						{/* status */}
						{/* <Col>
							<Form.Group as={Row} className="mb-3">
								<Col sm="2">
									<Form.Label>Status</Form.Label>
								</Col>
								<Col sm="10">
									<Form.Select
										aria-label="Default select example"
										sm="6"
										value={status}
										onChange={(e) => setStatus(e.target.value)}
									>
										<option value="1">Select Status</option>
										<option value="marrid">marrid</option>
										<option value="not marrid">not marrid</option>
									</Form.Select>
								</Col>
							</Form.Group>
						</Col> */}
						{/* exprience year */}
						<Form.Group as={Row} className="mb-3">
							<Col sm="2">
								<Form.Label>Exprience Years</Form.Label>
							</Col>
							<Col sm="10">
								<Form.Control
									type="number"
									value={exprienceYears}
									onChange={(e) => setExprienceYears(e.target.value)}
								/>
							</Col>
						</Form.Group>
						{/* skills */}
						<Form.Group as={Row} className="mb-3">
							<Col sm="2">
								<Form.Label>Skills</Form.Label>
							</Col>
							<Col sm="9">
								<Form.Control
									value={skills}
									onChange={(e) => setSkills(e.target.value)}
								/>
							</Col>
							<Col sm="1">
								<button
									className="btn btn-success add-skill-btn"
									type="button"
									onClick={onAddSkillsHandler}
								>
									Add
								</button>
							</Col>
						</Form.Group>

						<div className="skills">
							<ul>
								{allSkills &&
									allSkills.map((single) => (
										<li
											key={generateRandomId()}
											onClick={() => deleteSkillHandler(single)}
										>
											{single.title}
											<span className="delete-skill">Delete</span>
										</li>
									))}
							</ul>
						</div>
						{/* interested */}
						<Form.Group as={Row} className="mb-3">
							<Col sm="2">
								<Form.Label>Interested</Form.Label>
							</Col>
							<Col sm="9">
								<Form.Control
									value={interested}
									onChange={(e) => setInterested(e.target.value)}
								/>
							</Col>
							<Col sm="1">
								<button
									className="btn btn-success add-skill-btn"
									type="button"
									onClick={onAddInterestHandler}
								>
									Add
								</button>
							</Col>
						</Form.Group>

						<div className="skills">
							<ul>
								{allInterested &&
									allInterested.map((single) => (
										<li
											key={generateRandomId()}
											onClick={() => deleteInterestedHandler(single)}
										>
											{single.title}
											<span className="delete-skill">Delete</span>
										</li>
									))}
							</ul>
						</div>

						{/* resume */}
						<Form.Group as={Row} controlId="formFileLg" className="mb-3">
							<Col sm="2">
								<Form.Label>Upload CV</Form.Label>
							</Col>
							<Col sm="10">
								<div>{cv ? <div>{cv}</div> : <div>No file selected</div>}</div>
								<Form.Control
									type="file"
									size="lg"
									name="cv"
									onChange={handleCVChange}
								/>
							</Col>
						</Form.Group>
						<Col className="buttons">
							<Link variant="danger" to="/" className="btn btn-danger">
								Cancel
							</Link>
							<Button as="input" type="submit" value="Update Profile" />
						</Col>
					</Form>
				</Row>
			</Container>
		</div>
	);
};

export default EditeProfilePage;
