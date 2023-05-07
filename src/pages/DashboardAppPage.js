import { Helmet } from 'react-helmet-async';
import React, { useState, useEffect } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Typography, TextField, Card, Button } from '@mui/material';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import cacoimage from '../assets/chat.png'
import books from '../assets/book-stack.png'
import mentalhealth from '../assets/mental-health.png'
import school from '../assets/school.png'
import study from '../assets/study.png'
import gym from '../assets/weightlifter.png'

// components
import UsersService from '../services/UserService'
// sections
const Alert = React.forwardRef((props, ref) => {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function DashboardAppPage() {

  const theme = useTheme();
  const [firstname, setFirstName] = useState("")
  const [lastname, setLastName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [invalidPhone, setInvalidPhone] = useState(false)
  const [invalidEmail, setInvalidEmail] = useState(false)
  const [securityChecked, setSecurityChecked] = useState(false)
  const [code, setCode] = useState("")
  const [allCourses, setAllCourses] = useState([])
  const [emailSent, setEmailSent] = useState(false)
  const [showVerified, setShowVerified] = useState(false)
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [checked, setChecked] = useState([]);
  const usersService = UsersService();


  useEffect(() => {
    const fetchCourses = async () => {
      const fullCourseList = await usersService.showCourses()
      setAllCourses(fullCourseList)
    }

    fetchCourses().catch(console.error);;
  }, [])

  const handleToggle = (value) => () => {
    //  const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    //  console.log("This is what checked looks like in the beginning: ", checked)
    //  console.log("This is what newChecked looks like: ", newChecked)
    //  console.log("Current Index: ", checked.indexOf(value))
    //  console.log("Value in handleToggle: ", value)
    if (checked.indexOf(value) === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(checked.indexOf(value), 1);
    }
    setChecked(newChecked);
    const newCurrentIndex = checked.indexOf(value);
    //  console.log("This is what checked looks like in the end: ", checked)
    //  console.log("This is the new index of the couse: ", newCurrentIndex)
  };

  const handleChange = (event) => {

    switch (event.target.name) {
      case 'firstname':
        setFirstName(event.target.value)
        break;
      case 'lastname':
        setLastName(event.target.value)
        break;
      case 'phone':
        if (event.target.value.length !== 10) {
          setInvalidPhone(true)
        } else {
          setInvalidPhone(false)
        }
        setPhone(event.target.value)
        break;
      case 'email':
        if (!event.target.value.endsWith("@queensu.ca")) {
          setInvalidEmail(true)
        } else {
          setInvalidEmail(false)
        }
        setEmail(event.target.value)
        break;
      case 'code':
        setCode(event.target.value)
        console.log(code)
        break;
      default:

    }

  };

  async function handleClick() {
    setEmailSent(true)
    const verifyCode = Math.floor(Math.random() * 90000) + 10000

    const body = {
      first_name: firstname,
      last_name: lastname,
      queens_email: email,
      user_phone: phone,
      code: verifyCode
    }
    try {
      await usersService.insertUser(body)
      await usersService.sendEmailCode({
        user_code: verifyCode,
        queens_email: email
      })
    } catch (e) {
      console.log(e)
    }
  }

  async function handleCourseClick(){
    console.log(checked)
  }

  async function handleCodeClick() {
    const matchCode = await usersService.checkCode(code, email)
    console.log(matchCode)
    if (matchCode) {
      setShowVerified(true)
    } else {
      setOpenSnackbar(true)
    }
  }
  const handleSecurityCheckbox = (event) => {
    console.log(event.target.checked)
    setSecurityChecked(event.target.checked);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackbar(false);
  };
  return (
    <>
      <Helmet>
        <title> CaCo </title>
      </Helmet>


      {/* <Typography variant="h2" sx={{ mb: 5 }}>
          Welcome to CaCo
        </Typography> */}

      <Grid container spacing={2}>
        <Grid item xs={12} sm={25} md={15}>
          <Card
            style={{
              py: 5,
              boxShadow: 0,
              textAlign: 'center',
              color: "#f5ca28",
              backgroundColor: "#181a30"

            }}

          >


            <Typography variant="h1" sx={{ opacity: 1, paddingBottom: 5, marginTop: 2 }}>
              Welcome to CaCo
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={15} sm={5} md={5} sx={{ textAlign: 'center' }}>

                <Typography variant="h3" sx={{ fontWeight: 'bold', marginBottom: 2, marginLeft: 32 }}>
                  The Personal Texting Assitant for Queen's University Students!
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: 2, marginLeft: 32 }}>
                  CaCo provides a quick and easy way to get answers for any campus related inquiries a student can have!
                </Typography>
                <Grid container spacing={1} sx={{ marginLeft: 15, marginTop: 6 }}>
                  <Grid item xs={5} sm={5} md={2} sx={{ textAlign: 'center', alignItems: 'center', justifyContent: 'center', display: 'flex' }}>
                    <Card
                      style={{
                        py: 5,
                        boxShadow: 0,
                        textAlign: 'center',
                        color: "#181a30",
                        backgroundColor: "#f5ca28",
                        flexDirection: "column",
                        padding: 10, alignItems: 'center', justifyContent: 'center', display: 'flex'
                      }}

                    >
                      <img src={books} alt="Caco Phone" width={80} height={80} style={{ marginBottom: 1 }} />
                      <Typography variant="p">Course Information</Typography>
                    </Card>

                  </Grid>
                  <Grid item xs={15} sm={5} md={2} sx={{ textAlign: 'center', alignItems: 'center', justifyContent: 'center', display: 'flex', marginLeft: 3 }}>
                    <Card
                      style={{
                        py: 5,
                        boxShadow: 0,
                        textAlign: 'center',
                        color: "#181a30",
                        backgroundColor: "#f5ca28",
                        flexDirection: "column",
                        padding: 10, alignItems: 'center', justifyContent: 'center', display: 'flex'
                      }}

                    >
                      <img src={school} alt="Caco Phone" width={80} height={80} style={{ marginBottom: 1 }} />
                      <Typography variant="p">Campus FAQs</Typography>
                    </Card>

                  </Grid>
                  <Grid item xs={15} sm={5} md={2} sx={{ textAlign: 'center', alignItems: 'center', justifyContent: 'center', display: 'flex', marginLeft: 3 }}>
                    <Card
                      style={{
                        py: 5,
                        boxShadow: 0,
                        textAlign: 'center',
                        color: "#181a30",
                        backgroundColor: "#f5ca28",
                        flexDirection: "column",
                        padding: 10, alignItems: 'center', justifyContent: 'center', display: 'flex'
                      }}

                    >
                      <img src={study} alt="Caco Phone" width={80} height={80} style={{ marginBottom: 1 }} />
                      <Typography variant="p">Study Room Bookings</Typography>
                    </Card>

                  </Grid>
                  <Grid item xs={15} sm={5} md={2} sx={{ textAlign: 'center', alignItems: 'center', justifyContent: 'center', display: 'flex', marginLeft: 3 }}>
                    <Card
                      style={{
                        py: 5,
                        boxShadow: 0,
                        textAlign: 'center',
                        color: "#181a30",
                        backgroundColor: "#f5ca28",
                        flexDirection: "column",
                        padding: 10, alignItems: 'center', justifyContent: 'center', display: 'flex'
                      }}

                    >
                      <img src={gym} alt="Caco Phone" width={80} height={80} style={{ marginBottom: 1 }} />
                      <Typography variant="p">ARC Reservations</Typography>
                    </Card>

                  </Grid>
                  <Grid item xs={15} sm={5} md={2} sx={{ textAlign: 'center', alignItems: 'center', justifyContent: 'center', display: 'flex', marginLeft: 3 }}>
                    <Card
                      style={{
                        py: 5,
                        boxShadow: 0,
                        textAlign: 'center',
                        color: "#181a30",
                        backgroundColor: "#f5ca28",
                        flexDirection: "column",
                        padding: 10, alignItems: 'center', justifyContent: 'center', display: 'flex'
                      }}

                    >
                      <img src={mentalhealth} alt="Caco Phone" width={80} height={80} style={{ marginBottom: 1 }} />
                      <Typography variant="p">Mental Health Help</Typography>
                    </Card>

                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={10} sm={8} md={6} sx={{ alignItems: "right", justifyContent: "right", display: "flex", paddingBottom: 10, marginRight: 15 }}>
                <Card
                  style={{
                    py: 5,
                    boxShadow: 0,
                    textAlign: 'left',
                    color: "#181a30",
                    backgroundColor: "#f5ca28",
                    padding: 10
                  }}

                >
                  <Typography variant="h3">
                    Check Out CaCo in Action
                  </Typography>
                  <iframe src="https://youtube.com/embed/9rOlfyppjJA" style={{ height: "350px", width: "550px" }} title="Iframe Example" />
                </Card>

              </Grid>

            </Grid>
          </Card>
        </Grid>


        <Grid item xs={12} sm={25} md={15}>
          <div hidden={showVerified}>
            <Card
              style={{
                py: 5,
                boxShadow: 0,
                textAlign: 'center',
                color: "#181a30",
                backgroundColor: "#f5ca28"

              }}

            >


              <Typography variant="h1" sx={{ opacity: 1, paddingBottom: 5, marginTop: 2 }}>
                Start Using CaCo Today
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={15} sm={5} md={5} sx={{ marginLeft: 20, textAlign: 'center', alignItems: 'center', justifyContent: 1 }}>

                  <Typography variant="h3" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
                    Sign Up
                  </Typography>
                  <TextField required name="firstname" label="First Name"
                    sx={{ input: { color: "#181a30" }, marginRight: 3, marginBottom: 2, width: 300, display: emailSent ? "none" : "" }}
                    onChange={e => { handleChange(e) }}

                  />
                  <TextField required name="lastname" label="Last Name"
                    sx={{ width: 300, input: { color: "#181a30" }, display: emailSent ? "none" : "" }}
                    onChange={e => { handleChange(e) }}
                  />
                  <TextField required name="email" label="Email Address" error={email && invalidEmail} helperText={invalidEmail ? "This must be a valid Queen's email account" : ""}
                    sx={{ input: { color: "#181a30" }, marginRight: 3, marginBottom: 2, width: 300, display: emailSent ? "none" : "" }}
                    onChange={e => { handleChange(e) }}
                  />
                  <TextField required name="phone" label="Phone Number" error={phone && invalidPhone} helperText={invalidPhone ? "This phone number is invalid" : ""}
                    sx={{ input: { color: "#181a30" }, width: 300, display: emailSent ? "none" : "" }}
                    onChange={e => { handleChange(e) }}
                  />
                  <FormGroup>

                    <FormControlLabel sx={{ display: emailSent ? "none" : "" }} required control={<Checkbox />} label="I have read CaCo's privacy and security policy and consent to the guidelines they have outlined." onChange={e => { handleSecurityCheckbox(e) }} />

                  </FormGroup>

                  <Button variant="contained" size="large" sx={{ backgroundColor: "#181a30", color: "#f5ca28", marginBottom: 5, marginTop: 2, justifyContent: 'center', paddingLeft: 4, paddingRight: 4, display: emailSent ? "none" : "" }} disabled={!(firstname && lastname && email && phone && !invalidEmail && !invalidPhone && securityChecked)} onClick={(e) => { handleClick() }}>Submit</Button>

                  <Typography variant="h4" style={{ display: emailSent ? "" : "none" }}>
                    A code has been sent to your Queen's email
                  </Typography>
                  <TextField type='number' name="code" label="Enter Code" inputProps={{ min: 0, maxLength: 5, style: { textAlign: 'center' } }}
                    sx={{ input: { color: "#181a30" }, marginTop: 5, align: 'center', marginRight: 3, marginBottom: 2, width: 350, display: emailSent ? "" : "none" }}
                    onChange={e => { handleChange(e) }}
                  />

                  <br />
                  <Button variant="contained" size="large" sx={{ backgroundColor: "#181a30", color: "#f5ca28", display: emailSent ? "" : "none" }} disabled={code.length !== 5 || showVerified} onClick={(e) => { handleCodeClick() }}>Confirm Email</Button>
                  <Typography variant="h4" sx={{ color: '#32a852', diplay: 'flex', maringTop: 5 }} hidden={!showVerified}>
                    Success! You are now ready to use CaCo 📱
                  </Typography>
                  <Typography variant="h3" sx={{ color: '#32a852', diplay: 'flex' }} hidden={!showVerified}>
                    Text CaCo Here: +1 (365) 536-2226
                  </Typography>
                  <Typography variant="h3" sx={{ color: '#32a852', diplay: 'flex' }} hidden={!showVerified}>
                    Check all the courses that you are taking this semester for a more personal experience! (Optional)
                  </Typography>
                </Grid>

                <Grid item xs={15} sm={5} md={4} sx={{ alignItems: "right", justifyContent: "right", display: "flex", paddingBottom: 10 }}>
                  <img src={cacoimage} alt="Caco Phone" width={450} height={450} style={{ marginRight: 100 }} />
                </Grid>

              </Grid>
            </Card>
          </div>

          <div hidden={!showVerified}>
            <Card
              style={{
                py: 5,
                boxShadow: 0,
                textAlign: 'center',
                color: "#181a30",
                backgroundColor: "#f5ca28"

              }}

            >


              <Typography variant="h1" sx={{ opacity: 1, paddingBottom: 5, marginTop: 2 }}>
                Success! You are now ready to use CaCo
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={15} sm={5} md={5} sx={{ marginLeft: 20, textAlign: 'left', alignItems: 'left', justifyContent: 1 }}>

                  <Typography variant="h3" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
                    Text CaCo Here: +1 (365) 536-2226
                  </Typography>
                  <Typography variant="h5" sx={{ marginBottom: 2 }}>
                    Check all the courses that you are taking this semester for a more personal experience! (Optional)
                  </Typography>
                  <List sx={{ width: '100%', maxWidth: 360}}>
                    {allCourses.map((value) => {
                      console.log(`Index of: ${value.course_code} = ${checked.indexOf(value)}`)
                      const labelId = `checkbox-list-label-${value.course_code}`;

                      return (
                        <ListItem
                          key={value.course_code}
                          disablePadding
                        >
                          <ListItemButton role={undefined} onClick={handleToggle(value)} dense>
                            <ListItemIcon>
                              <Checkbox
                                edge="start"
                                checked={checked.indexOf(value) !== -1}
                                tabIndex={-1}
                                disableRipple
                                inputProps={{ 'aria-labelledby': labelId }}
                              />
                            </ListItemIcon>
                            <ListItemText id={labelId} primary={`${value.course_code} - ${value.course_name}`} />
                          </ListItemButton>
                        </ListItem>
                      );
                    })}
                  </List>
                  <Button variant="contained" size="large" sx={{ backgroundColor: "#181a30", color: "#f5ca28", marginBottom: 5, marginTop: 2, justifyContent: 'center', paddingLeft: 4, paddingRight: 4}} disabled={!(firstname && lastname && email && phone && !invalidEmail && !invalidPhone && securityChecked)} onClick={(e) => { handleCourseClick() }}>Add Courses</Button>
                </Grid>
                <Grid item xs={15} sm={5} md={4} sx={{ alignItems: "right", justifyContent: "right", display: "flex", paddingBottom: 10 }}>
                  <img src={cacoimage} alt="Caco Phone" width={450} height={450} style={{ marginRight: 100 }} />
                </Grid>
              </Grid>
            </Card>
          </div>


        </Grid>
        <Snackbar open={openSnackbar} autoHideDuration={4000} onClose={handleSnackbarClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center"
          }}>
          <Alert onClose={handleSnackbarClose} severity="error" sx={{ width: '100%' }}>
            Invalid Code
          </Alert>
        </Snackbar>
        {/* <Grid item xs={12} sm={25} md={15}>
            <AppWidgetSummary title="New Users" total={1352831} color="info" icon={'ant-design:apple-filled'} />
          </Grid> */}

        {/* <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Item Orders" total={1723315} color="warning" icon={'ant-design:windows-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Bug Reports" total={234} color="error" icon={'ant-design:bug-filled'} />
          </Grid> */}

        {/* <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits
              title="Website Visits"
              subheader="(+43%) than last year"
              chartLabels={[
                '01/01/2003',
                '02/01/2003',
                '03/01/2003',
                '04/01/2003',
                '05/01/2003',
                '06/01/2003',
                '07/01/2003',
                '08/01/2003',
                '09/01/2003',
                '10/01/2003',
                '11/01/2003',
              ]}
              chartData={[
                {
                  name: 'Team A',
                  type: 'column',
                  fill: 'solid',
                  data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
                },
                {
                  name: 'Team B',
                  type: 'area',
                  fill: 'gradient',
                  data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                },
                {
                  name: 'Team C',
                  type: 'line',
                  fill: 'solid',
                  data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Current Visits"
              chartData={[
                { label: 'America', value: 4344 },
                { label: 'Asia', value: 5435 },
                { label: 'Europe', value: 1443 },
                { label: 'Africa', value: 4443 },
              ]}
              chartColors={[
                theme.palette.primary.main,
                theme.palette.info.main,
                theme.palette.warning.main,
                theme.palette.error.main,
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppConversionRates
              title="Conversion Rates"
              subheader="(+43%) than last year"
              chartData={[
                { label: 'Italy', value: 400 },
                { label: 'Japan', value: 430 },
                { label: 'China', value: 448 },
                { label: 'Canada', value: 470 },
                { label: 'France', value: 540 },
                { label: 'Germany', value: 580 },
                { label: 'South Korea', value: 690 },
                { label: 'Netherlands', value: 1100 },
                { label: 'United States', value: 1200 },
                { label: 'United Kingdom', value: 1380 },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentSubject
              title="Current Subject"
              chartLabels={['English', 'History', 'Physics', 'Geography', 'Chinese', 'Math']}
              chartData={[
                { name: 'Series 1', data: [80, 50, 30, 40, 100, 20] },
                { name: 'Series 2', data: [20, 30, 40, 80, 20, 80] },
                { name: 'Series 3', data: [44, 76, 78, 13, 43, 10] },
              ]}
              chartColors={[...Array(6)].map(() => theme.palette.text.secondary)}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppNewsUpdate
              title="News Update"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: faker.name.jobTitle(),
                description: faker.name.jobTitle(),
                image: `/assets/images/covers/cover_${index + 1}.jpg`,
                postedAt: faker.date.recent(),
              }))}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppOrderTimeline
              title="Order Timeline"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: [
                  '1983, orders, $4220',
                  '12 Invoices have been paid',
                  'Order #37745 from September',
                  'New order placed #XF-2356',
                  'New order placed #XF-2346',
                ][index],
                type: `order${index + 1}`,
                time: faker.date.past(),
              }))}
            />
          </Grid> */}

        {/* <Grid item xs={12} md={6} lg={4}>
            <AppTrafficBySite
              title="Traffic by Site"
              list={[
                {
                  name: 'FaceBook',
                  value: 323234,
                  icon: <Iconify icon={'eva:facebook-fill'} color="#1877F2" width={32} />,
                },
                {
                  name: 'Google',
                  value: 341212,
                  icon: <Iconify icon={'eva:google-fill'} color="#DF3E30" width={32} />,
                },
                {
                  name: 'Linkedin',
                  value: 411213,
                  icon: <Iconify icon={'eva:linkedin-fill'} color="#006097" width={32} />,
                },
                {
                  name: 'Twitter',
                  value: 443232,
                  icon: <Iconify icon={'eva:twitter-fill'} color="#1C9CEA" width={32} />,
                },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppTasks
              title="Tasks"
              list={[
                { id: '1', label: 'Create FireStone Logo' },
                { id: '2', label: 'Add SCSS and JS files if required' },
                { id: '3', label: 'Stakeholder Meeting' },
                { id: '4', label: 'Scoping & Estimations' },
                { id: '5', label: 'Sprint Showcase' },
              ]}
            />
          </Grid> */}
        {/* INITIAL COMMENT OUT */}
      </Grid>

    </>
  );
}