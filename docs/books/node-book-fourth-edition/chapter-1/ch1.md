# Introduction.

Long-Term Support(LTS).
The NodeJS release schedule is based on the [`Semantic Versioning`](https://semver.org/) standard.

**_Semantic Versioning 2.0.0_**

Given a version number `MAJOR`.`MINOR`.PATCH, increment the:

1. `MAJOR` version when you **make incompatible API changes**
2. `MINOR` version when you **add functionality in a backward compatible manner**
3. `PATCH` version when you **make backward compatible bug fixes**

Additional labels for pre-release and build metadata are available as extensions to the `MAJOR`.`MINOR`.`PATCH` format.

The NodeJS release policy stats that there are two major releases of NodeJS per year.
One in `April` and one in `October`.

- Even-numbered major releases of Node.js are promoted to LTS after 6 months. Even-numbered releases are scheduled for release in April and promoted to LTS in October. LTS releases are supported for 30 months. It is recommended to use LTS
  versions of Node.js for production applications.

- Odd-numbered major releases are released in October and are only supported for 6 months. Odd-numbered releases are expected to be used to try out new features and test the migration path, **_but are not generally recommended for use in production applications._**

All LTS versions of Node.js are given `codenames`, named after elements. Node.js `18.x` has the LTS codename **`Hydrogen`** (18.x 2022).

**List of codenames of LTS releases.**

- Fermium (14.x 2020)
- Gallium (16.x 2021)
- Hydrogen (18.x 2022)
- Iron (20.x 2023)
- Jod (22.x 2024)


## NodeJS Installing

1. fnm [Fast Node Manager](https://github.com/Schniz/fnm)
2. nvm [Node Version Manager](https://github.com/nvm-sh/nvm)
3. n [Interactively Manage Your Node.js Versions](https://github.com/tj/n)
4. You can install Node.js manually from Node.js [downloads page](https://nodejs.org/en/download/)


## Accessing the Node.js API documentation

The Node.js documentation also describes how to interact with APIs,  including which arguments a method accepts and the method's return value.


### [Node.js v18.19.0 documentation](https://nodejs.org/docs/latest-v18.x/api/documentation.html)

**Node.js is a JavaScript runtime built on the V8 JavaScript engine.**

#### Stability index 

Throughout the documentation are indications of a section's stability. Some APIs are so proven and so relied upon that they are unlikely to ever change at all. Others are brand new and experimental, or known to be hazardous.

1. Stability: 0 - Deprecated. The feature may emit warnings. Backward compatibility is not guaranteed.
2. Stability: 1 - Experimental. The feature is not subject to semantic versioning rules. Non-backward compatible changes or removal may occur in any future release. Use of the feature is not recommended in production environments.
3. Stability: 2 - Stable. Compatibility with the npm ecosystem is a high priority.
4. Stability: 3 - Legacy. Although this feature is unlikely to be removed and is still covered by semantic versioning guarantees, it is no longer actively maintained, and other alternatives are available.

```bash
node --help
Usage: node [options] [ script.js ] [arguments]
       node inspect [options] [ script.js | host:port ] [arguments]
```