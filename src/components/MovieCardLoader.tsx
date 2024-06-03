import React from "react";
import posterPlaceholder from "../img/poster-placeholder.jpg";

export const MovieCardLoader = () => {
    return (
        <div className="card">
            <div className="skeleton-card">
                <h1 className="caption">Кино справочник</h1>
                <div className="name" />
                <div className="content">
                    <div className="description">
                        <div className="desc">
                            <div className="line" />
                            <div className="line" />
                            <div className="line" />
                        </div>
                        <div className="info" />
                        <div className="info" />
                        <div className="info" />
                    </div>
                    <div className="poster"/>
                </div>
            </div>

        </div>
    )
}