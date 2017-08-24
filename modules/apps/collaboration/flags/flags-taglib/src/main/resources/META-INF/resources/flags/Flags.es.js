import { core } from 'metal';
import Component from 'metal-component';
import dom from 'metal-dom';
import { EventHandler } from 'metal-events';
import Modal from 'metal-modal';

import Soy from 'metal-soy';

import templates from './Flags.soy';

import PortletBase from 'frontend-js-web/liferay/PortletBase.es';

/**
 * Flags
 *
 * It opens a dialog where the user can flag the page.
 *
 * @abstract
 * @extends {PortletBase}
 */
class Flags extends PortletBase {
	/**
	 * @inheritDoc
	 */
	created() {
		this.eventHandler_ = new EventHandler();
	}

	/**
	 * @inheritDoc
	 */
	attached() {
		this.reportDialogOpen = false;
		this.rootNode = this.one('.taglib-flags');
	}

	/**
	 * @inheritDoc
	 */
	detached() {
		super.detached();
		this.eventHandler_.removeAllListeners();
	}

	/**
	 * Closes the dialog to flag the page.
	 */
	closeReportDialog() {
		this.reportDialogOpen = false;
	}

	/**
	 * Opens a dialog where the user can flag the page.
	 */
	openReportDialog() {
		this.reportDialogOpen = true;
	}

	/**
	 * Checks the reason selected by the user, and allows
	 * to introduce a specific reasons if necessary.
	 *
	 * @param {Event} event
	 * @protected
	 */
	onReasonChange_(event) {
		let reason = event.delegateTarget.value;

		let otherReasonContainer = this.one('#otherReasonContainer');

		if (reason === 'other') {
			dom.removeClasses(otherReasonContainer, 'hide');
		}
		else {
			dom.addClasses(otherReasonContainer, 'hide');
		}
	}
};

/**
 * State definition.
 * @ignore
 * @static
 * @type {!Object}
 */
Flags.STATE = {
	/**
	 * Portlet's data.
	 * @instance
	 * @memberof Flags
	 * @type {!Object}
	 */
	data: {
		validator: core.isObject
	},

	/**
	 * Whether the user is able to flag the page.
	 * @instance
	 * @memberof Flags
	 * @type {!Boolean}
	 */
	flagsEnabled: {
		validator: core.isBoolean
	},

	/**
	 * Uri of the page that will be opened
	 * in the dialog.
	 * @instance
	 * @memberof Flags
	 * @type {String}
	 */
	uri: {
		validator: core.isString
	}
};

// Register component
Soy.register(Flags, templates);

export default Flags;