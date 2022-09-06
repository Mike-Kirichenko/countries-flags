import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { IoArrowBack } from "react-icons/io5";
import { selectDetails } from "../store/details/details-selector";
import { loadCountryByName } from "../store/details/details-actions";
import { Button } from "../components/Button";
import { Info } from "../components/Info";

export const Details = () => {
  const { name } = useParams();
  const dispatch = useDispatch();
  const { currentCountry, error, status } = useSelector(selectDetails);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(loadCountryByName(name));
  }, [dispatch, name]);

  return (
    <div>
      <Button onClick={() => navigate(-1)}>
        <IoArrowBack /> Back
      </Button>
      {status === "loading" && <h2>Loading...</h2>}
      {error && <h2>{error}</h2>}
      {currentCountry && <Info push={navigate} {...currentCountry} />}
    </div>
  );
};
