import lang from "../helper/lang";

const ShowTotal = (total) => {
    return (
        `${lang("Total")} ${total} ${lang("Record")}`
    );
};

export default ShowTotal;