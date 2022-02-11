//React & CoreUI
import React from 'react';
import {
    CButton,
    CCol,
    CRow, CContainer
} from '@coreui/react';
import CIcon from '@coreui/icons-react'

//Formik & Yup lib
import { Form, Formik } from "formik";
import * as Yup from "yup";

//Custom form elements
import SAInput from './saInput';
import SASelect from './saSelect';
import SAReactSelect from './SAReactAutoSelect';
import SAAutoComplete from './saAutocomplete';
import SARadio from './saRadio';
import SACheckBox from './saCheckbox';
import SATextArea from './saTextarea';
import SASingleFileInput from './saSingleFileInput';



const FormLibContainer = () => {

    const handleSubmit = (formProps) => {
        formProps.validateForm();
        console.log(formProps.values);

        //formProps.resetForm();
    }

    const handleCheckBoxChange = (obj, prop, val) => {
        console.log(obj[prop]);
        console.log(val);
    }

    const movies = [
        { title: 'The Shawshank Redemption', year: 1994 },
        { title: 'The Godfather', year: 1972 },
        { title: 'The Godfather: Part II', year: 1974 },
        { title: 'The Dark Knight', year: 2008 },
        { title: '12 Angry Men', year: 1957 },
        { title: "Schindler's List", year: 1993 },
        { title: 'Pulp Fiction', year: 1994 },
        { title: 'The Lord of the Rings: The Return of the King', year: 2003 },
        { title: 'The Good, the Bad and the Ugly', year: 1966 },
        { title: 'Fight Club', year: 1999 },
        { title: 'The Lord of the Rings: The Fellowship of the Ring', year: 2001 },
        { title: 'Star Wars: Episode V - The Empire Strikes Back', year: 1980 },
        { title: 'Forrest Gump', year: 1994 },
        { title: 'Inception', year: 2010 },
        { title: 'The Lord of the Rings: The Two Towers', year: 2002 },
        { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
        { title: 'Goodfellas', year: 1990 },
        { title: 'The Matrix', year: 1999 },
        { title: 'Seven Samurai', year: 1954 },
        { title: 'Star Wars: Episode IV - A New Hope', year: 1977 },
        { title: 'City of God', year: 2002 },
        { title: 'Se7en', year: 1995 },
        { title: 'The Silence of the Lambs', year: 1991 },
        { title: "It's a Wonderful Life", year: 1946 },
        { title: 'Life Is Beautiful', year: 1997 },
        { title: 'The Usual Suspects', year: 1995 },
        { title: 'Léon: The Professional', year: 1994 },
        { title: 'Spirited Away', year: 2001 },
        { title: 'Saving Private Ryan', year: 1998 },
        { title: 'Once Upon a Time in the West', year: 1968 },
        { title: 'American History X', year: 1998 },
        { title: 'Interstellar', year: 2014 },
        { title: 'Casablanca', year: 1942 },
        { title: 'City Lights', year: 1931 },
        { title: 'Psycho', year: 1960 },
        { title: 'The Green Mile', year: 1999 },
        { title: 'The Intouchables', year: 2011 },
        { title: 'Modern Times', year: 1936 },
        { title: 'Raiders of the Lost Ark', year: 1981 },
        { title: 'Rear Window', year: 1954 },
        { title: 'The Pianist', year: 2002 },
        { title: 'The Departed', year: 2006 },
        { title: 'Terminator 2: Judgment Day', year: 1991 },
        { title: 'Back to the Future', year: 1985 },
        { title: 'Whiplash', year: 2014 },
        { title: 'Gladiator', year: 2000 },
        { title: 'Memento', year: 2000 },
        { title: 'The Prestige', year: 2006 },
        { title: 'The Lion King', year: 1994 },
        { title: 'Apocalypse Now', year: 1979 },
        { title: 'Alien', year: 1979 },
        { title: 'Sunset Boulevard', year: 1950 },
        { title: 'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb', year: 1964 },
        { title: 'The Great Dictator', year: 1940 },
        { title: 'Cinema Paradiso', year: 1988 },
        { title: 'The Lives of Others', year: 2006 },
        { title: 'Grave of the Fireflies', year: 1988 },
        { title: 'Paths of Glory', year: 1957 },
        { title: 'Django Unchained', year: 2012 },
        { title: 'The Shining', year: 1980 },
        { title: 'WALL·E', year: 2008 },
        { title: 'American Beauty', year: 1999 },
        { title: 'The Dark Knight Rises', year: 2012 },
        { title: 'Princess Mononoke', year: 1997 },
        { title: 'Aliens', year: 1986 },
        { title: 'Oldboy', year: 2003 },
        { title: 'Once Upon a Time in America', year: 1984 },
        { title: 'Witness for the Prosecution', year: 1957 },
        { title: 'Das Boot', year: 1981 },
        { title: 'Citizen Kane', year: 1941 },
        { title: 'North by Northwest', year: 1959 },
        { title: 'Vertigo', year: 1958 },
        { title: 'Star Wars: Episode VI - Return of the Jedi', year: 1983 },
        { title: 'Reservoir Dogs', year: 1992 },
        { title: 'Braveheart', year: 1995 },
        { title: 'M', year: 1931 },
        { title: 'Requiem for a Dream', year: 2000 },
        { title: 'Amélie', year: 2001 },
        { title: 'A Clockwork Orange', year: 1971 },
        { title: 'Like Stars on Earth', year: 2007 },
        { title: 'Taxi Driver', year: 1976 },
        { title: 'Lawrence of Arabia', year: 1962 },
        { title: 'Double Indemnity', year: 1944 },
        { title: 'Eternal Sunshine of the Spotless Mind', year: 2004 },
        { title: 'Amadeus', year: 1984 },
        { title: 'To Kill a Mockingbird', year: 1962 },
        { title: 'Toy Story 3', year: 2010 },
        { title: 'Logan', year: 2017 },
        { title: 'Full Metal Jacket', year: 1987 },
        { title: 'Dangal', year: 2016 },
        { title: 'The Sting', year: 1973 },
        { title: '2001: A Space Odyssey', year: 1968 },
        { title: "Singin' in the Rain", year: 1952 },
        { title: 'Toy Story', year: 1995 },
        { title: 'Bicycle Thieves', year: 1948 },
        { title: 'The Kid', year: 1921 },
        { title: 'Inglourious Basterds', year: 2009 },
        { title: 'Snatch', year: 2000 },
        { title: '3 Idiots', year: 2009 },
        { title: 'Monty Python and the Holy Grail', year: 1975 },
    ];


    return (
        <>
            <CContainer>
                <Formik
                    initialValues={{
                        fullName: '',
                        email: '',
                        mobile: '',
                        brand: '',
                        myOption: '',
                        movie: '',
                        ticketOn: '',
                        paymentType: '',
                        gender: ['male'],
                        hasCode: false,
                        userPassword: '',
                        address: '',
                        myFile: null
                    }}
                    validationSchema={
                        Yup.object({
                            fullName: Yup.string()
                                .min(3, "Too short...! Must have at least 3 character")
                                .matches(/^([ a-zA-Z.]){3,20}$/, "Name must have a string value.")
                                .required("Required"),
                            email: Yup.string()
                                .required("Required")
                                .email("Please provide a valid email"),
                            brand: Yup.string().required('Required'),
                            myOption: Yup.string().required('Required'),
                            movie: Yup.string().required('Required'),
                            ticketOn: Yup.string().required('Required'),
                            paymentType: Yup.string().required('Required'),
                            gender: Yup.array().required(
                                "At least one checkbox is required"
                            ),
                            userPassword: Yup.string().required('Required'),
                            address: Yup.string().required('Required')
                        })
                    }
                    onSubmit={(values, {resetForm}) => {
                        console.log('Inside');
                        console.log(values);
                        resetForm();
                    }}
                >
                    {
                        formProps => {
                            

                            return (
                                <Form>
                                    <CRow>
                                        {/* Input type text */}
                                        <CCol md="4">
                                            <SAInput
                                                id="fullName"
                                                name="fullName"
                                                type="text"
                                                placeholder="Enter fullname"
                                                label="Full name"
                                                successMessage="Name is valid"
                                                isInline="false"
                                                lSize="4"
                                                rSize="8"
                                                isRequired="true"
                                                helpText="Please provide full name"
                                            />
                                        </CCol>
                                        {/* Input type email */}
                                        <CCol md="4">
                                            <SAInput
                                                id="email"
                                                name="email"
                                                type="email"
                                                placeholder="Enter email"
                                                label="Email"
                                                successMessage="Email is valid"
                                                isRequired="true"
                                            />
                                        </CCol>
                                        {/* Input type number */}
                                        <CCol md="4">
                                            <SAInput
                                                id="mobile"
                                                name="mobile"
                                                type="number"
                                                placeholder="Enter mobile number"
                                                label="Mobile Number"
                                                successMessage="Mobile number is valid"
                                            />
                                        </CCol>
                                    </CRow>
                                    <CRow>
                                        {/*Select*/}
                                        <CCol md="4">
                                            <SASelect
                                                id="brand"
                                                name="brand"
                                                label="Cold drinks"
                                                isRequired="true"
                                                helpText="Please choose a drink..."
                                                successMessage="Chosen a valid drink"
                                                options={[
                                                    {label: 'Coke', value: 'Coke'},
                                                    {label: 'Pepsi', value: 'Pepsi'},
                                                    {label: 'Dew', value: 'Dew'},
                                                    {label: 'Red Bull', value: 'RedBull'},
                                                    {label: 'Code Red', value: 'CodeRed'},
                                                ]}
                                            />
                                        </CCol>
                                        {/*AutoComplete*/}
                                        <CCol md="4">
                                            <SAAutoComplete
                                                id="movie"
                                                name="movie"
                                                label="Selet a movie"
                                                isRequired="true"
                                                options={movies}
                                                formProps={formProps}
                                                successMessage="Hove chossen the right one"
                                                helpText="Please choose movie..."
                                            />
                                        </CCol>
                                        {/*Datetime*/}
                                        <CCol md="4">
                                            <SAInput
                                                id="ticketOn"
                                                name="ticketOn"
                                                type="date"
                                                label="Ticket On"
                                                successMessage="Provided date is valid"
                                                isRequired="true"
                                                helpText="Please choose a valid date"
                                            />
                                        </CCol>
                                    </CRow>
                                    <CRow>
                                        {/*Radio button*/}
                                        <CCol md="4">
                                            <SARadio
                                                id="paymentType"
                                                name="paymentType"
                                                label="Payment Type"
                                                isRequired="true"
                                                lSize="4"
                                                rSize="8"
                                                isInline="false"
                                                options={[{
                                                    id: 'COD',
                                                    value: 'CashOnDelivery',
                                                    title: 'Cash On Delivery'
                                                },
                                                {
                                                    id: 'CP',
                                                    value: 'CardPayment',
                                                    title: 'Card Payment'
                                                }]}
                                                successMessage="Valid payment type is choosen"
                                                helpText="Please select a payment type"
                                            />
                                        </CCol>
                                        {/*Checkbox*/}
                                        <CCol md="4">
                                            <SACheckBox
                                                id="gender"
                                                name="gender"
                                                label="Gender"
                                                isRequired="true"
                                                lSize="2"
                                                rSize="10"
                                                isInline="true"
                                                handleChange={handleCheckBoxChange}
                                                formProps={formProps}
                                                options={[{
                                                    id: 'gender_male',
                                                    value: 'male',
                                                    title: 'Male',
                                                },
                                                {
                                                    id: 'gender_female',
                                                    value: 'female',
                                                    title: 'Female',
                                                },
                                                {
                                                    id: 'gender_other',
                                                    value: 'other',
                                                    title: 'Other',
                                                }]}
                                                successMessage="Valid gender type is choosen"
                                                helpText="Please select a gender type"
                                            />
                                        </CCol>
                                        {/*Password*/}
                                        <CCol md="4">
                                            <SAInput
                                                id="userPassword"
                                                name="userPassword"
                                                type="password"
                                                placeholder="Provide password"
                                                label="Password"
                                                successMessage="Password is valid"
                                                isInline="false"
                                                isRequired="true"
                                                helpText="Please provide a password"
                                            />
                                        </CCol>
                                    </CRow>
                                    <CRow>
                                        {/*AutoSelect */}
                                        <CCol md="4">
                                            <SAReactSelect 
                                                    id="myOption"
                                                    name="myOption"
                                                    label="My Option"
                                                    isRequired="true"
                                                    helpText="Please choose a option..."
                                                    successMessage="Chosen a valid option"
                                                    formProps={formProps}
                                                    options={[
                                                        {label: 'Option 1', value: 'option_1'},
                                                        {label: 'Option 2', value: 'option_2'},
                                                        {label: 'Option 3', value: 'option_3'},
                                                        {label: 'Option 4', value: 'option_4'},
                                                        {label: 'Option 5', value: 'option_5'},
                                                    ]}
                                                />
                                        </CCol>
                                        {/*TextArea */}
                                        <CCol md="4">
                                            <SATextArea 
                                                id="address"
                                                name="address"
                                                placeholder="Provide Address"
                                                label="Enter Address"
                                                successMessage="Address is valid"
                                                isInline="true"
                                                lSize="4"
                                                rSize="8"
                                                rows="8"
                                                isRequired="true"
                                                helpText="Please provide valid address"
                                            />
                                        </CCol>
                                        {/*Upload file*/}
                                        <CCol md="4">
                                            <SASingleFileInput
                                                name="myFile"
                                                label="Upload File"
                                                formProps={formProps}
                                                accept="image/*"
                                                lSize="4"
                                                rSize="8"

                                            />
                                        </CCol>
                                    </CRow>
                                    <CRow>
                                        <CCol md="10"></CCol>
                                        <CCol md="2">
                                            {/* <CButton 
                                                type="button" 
                                                size="sm" 
                                                color="primary"
                                                onClick={handleSubmit.bind(null, formProps)}>
                                                    <CIcon name="cil-scrubber" /> Submit
                                            </CButton> */}
                                            <CButton 
                                                type="submit" 
                                                size="sm" 
                                                color="primary">
                                                    <CIcon name="cil-scrubber" /> Submit
                                            </CButton>
                                        </CCol>
                                    </CRow>
                                </Form>
                            );
                        }
                    }
                </Formik>
            </CContainer>
        </>
    );
}

export default FormLibContainer;