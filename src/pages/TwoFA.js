import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { ReactComponent as Logo } from "../assets/icons/logo.svg";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { RESEND_2FA_MUTATION, VERIFY_2FA_MUTATION } from "../hooks";
import { authContext } from "../hooks/auth";
import { toastError, toastSuccess } from "../component/shared/Toasts";
import Button from "../component/shared/Button";

const TwoFA = () => {
	const { auth } = useContext(authContext);
	const [focus, setFocus] = useState("");
	const [twoFA, setTwoFA] = useState(new Array(6).fill(""));
	const [fillTwoFA, setFillTwoFA] = useState(false);
	const [isValid, setIsValid] = useState(false);

	const handleChange = (element, index) => {
		if (isNaN(element.value)) return false;

		setTwoFA([...twoFA.map((d, idx) => (idx === index ? element.value : d))]);
		if (element.nextSibling) {
			element.nextSibling.focus();
		}
	};

	useEffect(() => {
		if (twoFA.includes("")) {
			setIsValid(false);
		} else {
			setIsValid(true);
		}
	}, [twoFA]);

	let navigate = useNavigate();
	const [verify, { loading, reset }] = useMutation(VERIFY_2FA_MUTATION);
	const [resend2fa, { loading: resending }] = useMutation(RESEND_2FA_MUTATION);

	const handleSubmit = (e) => {
		e.preventDefault();

		if (twoFA) {
			verify({
        variables: {
          msisdn: auth?.user?.mobile,
          pin: twoFA.join(""),
        },
      })
        .then(() => {
          toastSuccess("User validated succesfully");
          navigate("/login");
        })
        .catch((error) => {
          reset();
          toastError(error.message);
        });
		} else {
			setFillTwoFA(true);
		}
	};

	const onResendToken = (e) => {
		e.preventDefault();

		resend2fa({
      variables: {
        msisdn: auth?.user?.mobile,
      },
    })
      .then((res) => {
        toastSuccess(res?.data?.sendTermiiTokenToMobile?.status);
        reset();
      })
      .catch((error) => {
        reset();
        toastError(error.message);
        // return loader && loader.current?.complete();
      });
	};

	return (
		<div className="login h-auto 2xl:h-screen">
			<NavLink to="/" className="flex justify-center login-logo">
				<Logo className="w-auto" />
			</NavLink>

			<div className="login-container">
				<p className="title">Phone number Authentication</p>
				<p className="subtitle-1">Enter the token sent to your phone number.</p>
				{fillTwoFA && (
					<p className="error-message">
						Oops! The token you entered doesn't match.
					</p>
				)}

				<div className={`${fillTwoFA ? "error-line" : "line"}`}></div>

				<form onSubmit={handleSubmit}>
					<div className="flex justify-center items-center login-container-code ">
						{twoFA.map((data, index) => (
							<input
								className={`auth_input flex items-center justify-center text-center ${
									focus === `input-${index}` ? "clicked" : ""
								}`}
								type="text"
								placeholder="-"
								id={`input-${index}`}
								name={`input-${index}`}
								maxLength="1"
								key={index}
								value={data}
								onChange={(e) => handleChange(e.target, index)}
								onFocus={(e) => {
									e.target.select();
									setFocus(`input-${index}`);
								}}
							/>
						))}
					</div>
					<Button
						className="login-container_login flex items-center justify-center cursor-pointerjustify-center"
						type="submit"
						disabled={!isValid}
						loading={loading}
					>
						{loading ? "Verifying code" : "Continue to login"}
					</Button>
				</form>

				<div className="login-subtitle-3">
					<Button.Link
						className="login-link mx-auto"
						onClick={onResendToken}
						loading={resending}
					>
						{resending ? "Resending token" : "Resend token"}
					</Button.Link>
				</div>
			</div>

			<div className="flex sm:flex-row flex-col justify-center items-center login-footer-link mt-48">
				<p className="login-footer-link_item my-2 sm:my-0">
					&copy; 2022 - Aeropaye
				</p>
				<NavLink to="/" className="login-footer-link_item my-2 sm:my-0">
					Terms and Conditions
				</NavLink>
				<NavLink to="/" className="login-footer-link_item my-2 sm:my-0">
					Privacy policy
				</NavLink>
				<NavLink to="/" className="login-footer-link_item my-2 sm:my-0">
					Contact us
				</NavLink>
			</div>
		</div>
	);
};

export default TwoFA;
