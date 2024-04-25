import { Box, Container, Grid, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import classes from "./JobsPage.module.css";
import { Link, useParams } from "react-router-dom";
import JobsFilter from "./component/JobsFilter/JobsFilter";
import PaginationJobs from "./component/Pagination/PaginationJobs";
import axios from "axios";
import API_CONFIG from "../../core/utils/apiConfig.js";
import { timeSincePublication } from "../../core/utils/helper.js";
// favorate icon import

import FavoriteBtn from "./component/FavoritBtn/FavoriteBtn.jsx";
// import { httpRequest } from "../../core/utils/httpRequest.js";

const JOBS_PER_PAGE = 10;

export default function JobsPage() {
	const [filterQuery, setFilterQuery] = useState();
	const [searchValue, setSearchValue] = useState();
	const [internShip, setInternShip] = useState([]);
	const [totalElements, setTotalElements] = useState(0);
	const { page: numberOfPage } = useParams();

	useEffect(() => {
		let url = `${API_CONFIG.baseUrl}${
			API_CONFIG.endpoints.jobs.allJobs
		}?size=${JOBS_PER_PAGE}&page=${numberOfPage || 1}`;

		if (searchValue) {
			url += `&search=${searchValue}`;
		} else if (filterQuery) {
			url += `&${filterQuery}`;
		}
		setTotalElements(45);
		getData(url);
	}, [filterQuery, numberOfPage, searchValue]);

	const getData = (url) => {
		axios({
			method: "get",
			url: url,
			headers: { "Content-Type": "application/json" },
		})
			.then((res) => {
				setInternShip(res.data.data);
				// console.log(res.data.data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const searchInput = (e) => {
		e.preventDefault();
		setSearchValue(e.target.value);
		if (e.target.value && filterQuery) {
			setFilterQuery("");
		}
	};

	return (
		<>
			<Container>
				<Grid style={{ margin: "30px" }}>
					<Grid.Col span={{ base: 12, sm: 4 }}>
						<div className={classes.filter}>
							<div>
								<div style={{ textAlign: "center" }}>
									<p className={classes.filterIcon}>
										{" "}
										<i
											className="fa-solid fa-filter"
											style={{ color: "#008BDC", paddingRight: "2px" }}
										></i>
										Filter
									</p>
								</div>
								<JobsFilter setFilterQuery={setFilterQuery} />
							</div>
						</div>
					</Grid.Col>
					<Grid.Col span={{ base: 12, sm: 8 }}>
						<Box className={classes.search} mx={"xs"}>
							<Box>
								<Text className={classes.label} mb={10} fz={16} fw={700}>
									Search
								</Text>
							</Box>

							<Box>
								<input
									className={classes.input}
									value={searchValue}
									onChange={searchInput}
									placeholder="title , skills , descrepation"
								/>
							</Box>
						</Box>
						{internShip.map((item) => (
							<div className={`interns ${classes.styleIntern}`} key={item.id}>
								<Link to={`/jobs/details/${item.jobId}`}>
									<div>
										<div className={classes.actively}>
											<i
												className="fa-solid fa-arrow-trend-up"
												style={{ color: "#3ae" }}
											></i>
											<p className={classes.active_hiring}>Actively hiring</p>
										</div>
										<div
											style={{
												display: "flex",
												justifyContent: "space-between",
											}}
										>
											<div>
												<p className={classes.hint}>{item.title}</p>
												<p className={classes.title}>{item.companyName}</p>
											</div>
											<div>
												<img
													src={item.companyImage}
													width={"50px"}
													height={"50px"}
												/>
											</div>
										</div>
										<div className={classes.country}>
											<i
												className="fa-solid fa-location-dot"
												style={{ color: "#8A8A8A" }}
											></i>{" "}
											{item.internLocation}
										</div>
										<div className={classes.info}>
											<div style={{ margin: "7px 10px 7px 0px " }}>
												<p className={classes.start}>
													{" "}
													<i
														className="fa-regular fa-circle-play"
														style={{
															color: "#8A8A8A",
															padding: "0px 2px 2px 0px",
														}}
													></i>
													START DATE
												</p>
												<p className={classes.immediately}>{item.startDate}</p>
											</div>
											<div style={{ margin: "7px 10px 7px 7px" }}>
												<p className={classes.start}>
													{" "}
													<i
														className="fa-regular fa-calendar"
														style={{
															color: "#8A8A8A",
															padding: "0px 2px 2px 0px",
														}}
													></i>
													DURATION
												</p>
												<p className={classes.immediately}>
													{item.duration} / {item.durationType}
												</p>
											</div>
											<div style={{ margin: "7px" }}>
												<p className={classes.start}>
													{" "}
													<i
														className="fa-solid fa-money-bill"
														style={{
															color: "#8A8A8A",
															padding: "0px 2px 2px 0px",
														}}
													></i>
													SALARY
												</p>
												<p className={classes.immediately}>
													${item.Salary} /monthly
												</p>
											</div>
										</div>

										<div style={{ display: "flex" }}>
											<p
												style={{
													margin: "5px 10px 5px 0px",
													backgroundColor: "rgb(241,255,229)",
													borderRadius: "6px",
													padding: "4px 7px",
													fontSize: "13px",
													color: "rgb(19,128,13)",
												}}
											>
												<i
													className="fa-regular fa-clock"
													style={{
														color: "rgb(19,128,13)",
														padding: "0px 2px 2px 0px",
													}}
												></i>
												{timeSincePublication(item.createdAt)}
											</p>
											<p
												style={{
													margin: "5px 10px 5px 10px",
													backgroundColor: "#eee",
													borderRadius: "6px",
													padding: "4px 7px",
													fontSize: "13px",
													color: "black",
												}}
											>
												Fresher Job
											</p>
											<p
												style={{
													margin: "5px 10px 5px 10px",
													backgroundColor: "#eee",
													borderRadius: "6px",
													padding: "4px 7px",
													fontSize: "13px",
													color: "black",
												}}
											>
												{item.internType}
											</p>
										</div>
										<div
											style={{
												backgroundColor: "#eee",
												height: "1px",
												margin: "10px 5px",
											}}
										></div>
									</div>
								</Link>
								<div className="d-flex justify-content-end show-details-fav-btn">
									{/* favorate icon */}
									<FavoriteBtn jobId={item.jobId} />
									{/* view details btn */}
									<div style={{ textAlign: "end", margin: "0px 5px" }}>
										<a
											href=""
											style={{
												display: "inline-block",
												marginTop: "2px",
												padding: "5px 7px",
												textDecoration: "none",
												border: "1px solid #008BDC",
												borderRadius: "6px",
												color: "#008BDC",
											}}
										>
											view details
										</a>
									</div>
								</div>
								{/* end of internship component */}
							</div>
						))}
						<PaginationJobs
							route={"/jobs"}
							totalElements={totalElements}
							ITEMS_PER_PAGE={JOBS_PER_PAGE}
							numberOfPage={numberOfPage}
						/>
					</Grid.Col>
				</Grid>
			</Container>
		</>
	);
}
