import React from "react";
import { RiLoader5Fill } from "react-icons/ri";
import styled from "styled-components";

export const ButtonStyle = styled.button`
	cursor: ${(props) => props.disabled && "not-allowed"};
	display: flex;
	align-items: center;
	justify-content: center;
	// background: ${(props) => props.disabled && "#EBEBF2"};

	// :hover {
	// 	background: ${(props) => props.disabled && "#EBEBF2"};
	// }
`;

function Button({
	children,
	type = "button",
	style,
	className,
	disabled,
	loading,
	onClick = () => {},
}) {
	return (
		<ButtonStyle
			type={type}
			style={style}
			onClick={() => onClick()}
			disabled={disabled || loading}
			className={className}
		>
			{children ?? "Title"}{" "}
			{loading && <RiLoader5Fill size={24} className="animate-spin ml-4" />}
		</ButtonStyle>
	);
}

Button.Green = ({
	children,
	type = "button",
	style,
	className,
	loading,
	disabled,
	onClick = () => {},
}) => {
	return (
		<ButtonStyle
			type={type}
			style={style}
			onClick={() => onClick()}
			disabled={disabled || loading}
			loading={loading}
			className={className}
		>
			{children ?? "Title"}{" "}
			{loading && <RiLoader5Fill size={24} className="animate-spin ml-4" />}
		</ButtonStyle>
	);
};

Button.Danger = ({
	children,
	type = "button",
	style,
	className,
	loading,
	disabled,
	onClick = () => {},
}) => {
	return (
		<ButtonStyle
			type={type}
			style={style}
			onClick={() => onClick()}
			disabled={disabled || loading}
			loading={loading}
			className={className}
		>
			{children ?? "Title"}{" "}
			{loading && <RiLoader5Fill size={24} className="animate-spin ml-4" />}
		</ButtonStyle>
	);
};

Button.Gray = ({
	children,
	type = "button",
	style,
	className,
	loading,
	disabled,
	onClick = () => {},
}) => {
	return (
		<ButtonStyle
			type={type}
			style={style}
			onClick={() => onClick()}
			disabled={disabled || loading}
			loading={loading}
			className={className}
		>
			{children ?? "Title"}{" "}
			{loading && <RiLoader5Fill size={24} className="animate-spin ml-4" />}
		</ButtonStyle>
	);
};

Button.Dark = ({
	children,
	type = "button",
	style,
	className,
	loading,
	disabled,
	onClick = () => {},
}) => {
	return (
		<ButtonStyle
			type={type}
			style={style}
			onClick={() => onClick()}
			disabled={disabled || loading}
			loading={loading}
			className={className}
		>
			{children ?? "Title"}{" "}
			{loading && <RiLoader5Fill size={24} className="animate-spin ml-4" />}
		</ButtonStyle>
	);
};

Button.Link = ({
	children,
	type = "button",
	style,
	className,
	loading,
	disabled,
	onClick = () => {},
}) => {
	return (
		<ButtonStyle
			type={type}
			style={style}
			onClick={onClick}
			disabled={disabled || loading}
			loading={loading}
			className={className}
		>
			{children ?? "Title"}{" "}
			{loading && (
				<RiLoader5Fill color="#000" size={24} className="animate-spin ml-4" />
			)}
		</ButtonStyle>
	);
};

export default Button;
