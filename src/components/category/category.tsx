import React from "react";
import { connect } from "react-redux";
import { Avatar, Chip, withStyles } from "@material-ui/core";
import { IRootState } from "../../services";
import { ICategory } from "../../services/categories-service";
import styles, { ICategoryClasses } from "./styles";

export interface ICategoryProps {
  id: number;
  data?: ICategory;
  classes?: ICategoryClasses;
}

export const Category = ({ data, classes }: ICategoryProps) =>
  data ? (
    <Chip
      avatar={
        <Avatar
          classes={{ root: classes?.icon }}
          alt={data.name}
          src={data.iconUrl}
        />
      }
      label={data.name}
      size="small"
      variant="outlined"
      color="secondary"
    />
  ) : null;

const mapStateToProps = (state: IRootState, props: ICategoryProps) => ({
  data: state.CategoriesService.get.data[props.id],
});

export default connect(mapStateToProps)(withStyles(styles)(Category));
